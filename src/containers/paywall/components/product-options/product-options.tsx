import React from "react";
import { Duration } from "../../../../types";

interface Props {
  calculatedPrice: number | null;
  duration: Duration;
  handleCalculatePrice: () => Promise<void>;
  handlePurchase: () => Promise<void>;
  handleSetDuration: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSetQuantity: (e: React.ChangeEvent<HTMLInputElement>) => void;
  quantity: number;
}

const ProductOptions = ({ 
  calculatedPrice,
  duration,
  handleCalculatePrice,
  handlePurchase,
  handleSetDuration,
  handleSetQuantity,
  quantity,
}: Props) => {
  return (
    <div className="paywall-options">
      <label>Quantity:</label>
      <input
        type="number"
        disabled={duration === Duration.Monthly}
        min="1"
        max="100"
        value={quantity}
        onChange={handleSetQuantity}
      />

      <label>Duration:</label>
      <select value={duration} onChange={handleSetDuration}>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      <button onClick={handleCalculatePrice}>Calculate Price</button>

      {calculatedPrice !== null && (
        <div>
          <p>Total Price: {calculatedPrice.toFixed(2)}€</p>
          <button onClick={handlePurchase}>Confirm Purchase</button>
        </div>
      )}
    </div>
  )
};

export default ProductOptions;
