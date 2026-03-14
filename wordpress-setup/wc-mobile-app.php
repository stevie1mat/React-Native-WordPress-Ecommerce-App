<?php
/**
 * Plugin Name: Mobile App Endpoints
 * Description: Custom REST API endpoints for the React Native Mobile App (Registration).
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('rest_api_init', function () {
    register_rest_route('myapp/v1', '/register', array(
        'methods' => 'POST',
        'callback' => 'myapp_register_customer',
        'permission_callback' => '__return_true', // Open to guest users
    ));
});

function myapp_register_customer(WP_REST_Request $request)
{
    $email = sanitize_email($request->get_param('email'));
    $password = $request->get_param('password');
    $name = sanitize_text_field($request->get_param('name'));
    $username = sanitize_user($request->get_param('username'));

    if (empty($email) || empty($password)) {
        return new WP_Error('missing_fields', 'Email and password are required.', array('status' => 400));
    }

    if (email_exists($email)) {
        return new WP_Error('email_exists', 'An account with this email already exists.', array('status' => 400));
    }

    if (empty($username)) {
        $username = explode('@', $email)[0];
    }

    // Ensure unique username
    $original_username = $username;
    $suffix = 1;
    while (username_exists($username)) {
        $username = $original_username . $suffix;
        $suffix++;
    }

    $user_id = wp_create_user($username, $password, $email);

    if (is_wp_error($user_id)) {
        return $user_id;
    }

    // Assign customer role and name
    $user = new WP_User($user_id);
    $user->set_role('customer');

    if (!empty($name)) {
        $name_parts = explode(' ', $name);
        $first_name = array_shift($name_parts);
        $last_name = join(' ', $name_parts);

        wp_update_user(array(
            'ID' => $user_id,
            'first_name' => $first_name,
            'last_name' => $last_name,
            'display_name' => $name,
        ));
    }

    return rest_ensure_response(array(
        'success' => true,
        'user_id' => $user_id,
        'message' => 'Account created successfully.'
    ));
}
