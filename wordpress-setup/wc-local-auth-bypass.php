<?php
/**
 * Plugin Name: WooCommerce Local Auth Bypass
 * Description: Enables basic authentication via query parameters over HTTP on local environments by bypassing strict HTTPS checks. Useful for React Native simulators passing Consumer Keys into Local WP.
 */

if (!defined('ABSPATH')) {
    exit;
}

// Ensure WooCommerce treats this Local WP HTTP site as localhost.
add_filter('woocommerce_rest_is_request_to_localhost', '__return_true');
