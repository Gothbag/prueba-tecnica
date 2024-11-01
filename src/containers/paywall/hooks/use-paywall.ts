import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Duration, Product } from "../../../types";
import { isCorrectQuantity } from "../validations";

const usePaywall = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [duration, setDuration] = useState<Duration>(Duration.Monthly);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setDuration(Duration.Monthly);
    setCalculatedPrice(null);
  };

  const handleSelectColor = () => handleProductSelect(Product.Color);
  const handleSelectInsider = () => handleProductSelect(Product.Insider);
  const handleSelectBoth = () => handleProductSelect(Product.Both);

  const handleSetQuantity =
    useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setQuantity(Number(e.target.value));
    }, []);
  const handleSetDuration =
    useCallback((e: ChangeEvent<HTMLSelectElement>) => {
      setQuantity(1);
      setDuration(e.target.value as Duration);
    }, []);

  const handleCalculatePrice = useCallback(async () => {
    if (!selectedProduct || !isCorrectQuantity(quantity)) return;

    const queryParams = new URLSearchParams({
      name: selectedProduct,
      quantity: quantity.toString(10),
      duration,
    }).toString();

    try {
      const response = await fetch(`http://localhost:3000/api/calculate?${queryParams}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      setCalculatedPrice(data.totalPrice);
    } catch (error) {
      console.error('Error calculating price:', error);
    }
  }, [quantity, duration, selectedProduct]);

  useEffect(() => {
    if (!!calculatedPrice) {
      handleCalculatePrice();
    }
  }, [duration, quantity])

  const handlePurchase = useCallback(async () => {
    if (!selectedProduct || !isCorrectQuantity(quantity)) return;

    try {
      const response = await fetch('http://localhost:3000/api/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: selectedProduct,
          quantity,
          duration,
        }),
      });

      const data = await response.json();
      alert(`Purchase made for ${data.totalPrice.toFixed(2)}€`);
    } catch (error) {
      console.error('Error finalizing purchase:', error);
    }
  }, [calculatedPrice, duration, quantity, selectedProduct]);

  return {
    calculatedPrice,
    duration,
    handleSelectBoth,
    handleSelectColor,
    handleSetDuration,
    handleSelectInsider,
    handleSetQuantity,
    handleCalculatePrice,
    handlePurchase,
    quantity,
    selectedProduct,
  };
}

export default usePaywall;