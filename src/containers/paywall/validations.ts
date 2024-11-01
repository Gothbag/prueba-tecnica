export const isCorrectQuantity = (quant: number) => {
  const quantity = +quant;
  return quantity >= 1 && quantity <= 100;
}
