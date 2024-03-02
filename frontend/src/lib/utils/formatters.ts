export function addZero(price: number) {
  const priceString = price.toString();
  if (priceString.includes(".")) {
    const decimals = priceString.split(".")[1];
    if (decimals.length === 1) {
      return priceString + "0" + "€";
    }
  }
  return priceString + "€";
}