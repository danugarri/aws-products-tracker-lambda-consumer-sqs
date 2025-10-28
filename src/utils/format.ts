export const parsePrice = (priceStr: string): number => {
  // Remove currency symbols and spaces
  const cleaned = priceStr.replace(/[^\d.,-]/g, "");

  // Replace commas if they're used as thousand separators
  const numericStr = cleaned.replace(/,/g, "");

  return parseFloat(numericStr);
};
