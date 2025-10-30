export const parsePrice = (priceStr: string): number => {
  if (!priceStr) return NaN;

  // Remove currency symbols, spaces, and non-numeric chars (except . , -)
  const cleaned = priceStr.replace(/[^\d.,-]/g, "");

  // If both . and , exist → last one is decimal separator
  if (cleaned.includes(",") && cleaned.includes(".")) {
    if (cleaned.lastIndexOf(",") > cleaned.lastIndexOf(".")) {
      // comma is decimal separator → remove all dots (thousands)
      return parseFloat(cleaned.replace(/\./g, "").replace(",", "."));
    } else {
      // dot is decimal separator → remove all commas (thousands)
      return parseFloat(cleaned.replace(/,/g, ""));
    }
  }

  // If only comma exists → assume it's decimal separator (EU format)
  if (cleaned.includes(",")) return parseFloat(cleaned.replace(",", "."));

  // Otherwise, assume normal decimal format (dot)
  return parseFloat(cleaned);
};
