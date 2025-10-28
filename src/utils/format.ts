export const parsePrice = (priceStr: string) => {
  // Remove anything that’s not a digit, dot, or minus sign
  const numericStr = priceStr.replace(/[^0-9.-]/g, "");
  return parseFloat(numericStr);
};
