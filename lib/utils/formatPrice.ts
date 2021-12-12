export const formatPrice = (priceString: string) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "AUD",
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 0,
  });

  // covert the price string to a number
  const price = parseFloat(priceString);

  const formatedPrice = formatter.format(price);

  return formatedPrice;
};
