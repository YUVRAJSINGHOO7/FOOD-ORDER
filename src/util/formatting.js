export const currencyFormatter = new Intl.NumberFormat('en-US', {          // built-in JS feature that is supported by browsers
    style: 'currency',
    currency: 'USD'
});