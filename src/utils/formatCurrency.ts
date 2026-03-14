export const formatCurrency = (amount: number | string, currency = 'USD'): string => {
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(numericAmount)) return '$0.00';

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(numericAmount);
};
