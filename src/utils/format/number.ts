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
