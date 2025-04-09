export const formatCurrency = (amount: number): string => {
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  // delete space between "Rp" and number
  return formatted;
};

export const formatNumber = (
  value: number | string,
  locale: string = "en-US",
  options: Intl.NumberFormatOptions = {}
): string => {
  const number = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(number)) return "Invalid number";

  return new Intl.NumberFormat(locale, options).format(number);
};
