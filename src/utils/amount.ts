export const amountFormatter = (value: string): string => {
  const amountAsNumber = parseFloat(value.replace(/[,]/g, '')) ?? 0;
  const formattedPrice: string = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
    .format(amountAsNumber)
    .replace(/[^0-9.,]/g, ''); // to remove currency symbol

  return formattedPrice;
};
