import React from "react";

import { Duration } from "../../../../types";
import { isCorrectQuantity } from "../../validations";

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
  const hasError = !isCorrectQuantity(quantity);

  return (
    <div className="paywall-options">
      <label>Quantity:</label>
      <div className="quantity-input">
        <input
          type="number"
          disabled={duration === Duration.Monthly}
          min="1"
          max="100"
          value={quantity}
          onChange={handleSetQuantity}
        />
        {hasError && <span className="error-message">Quantity must be between 1 and 100.</span>}
      </div>

      <label>Duration:</label>
      <select value={duration} onChange={handleSetDuration}>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      <button
        className="purchase-button"
        disabled={hasError}
        onClick={handleCalculatePrice}
      >
        Calculate Price
      </button>

      {calculatedPrice !== null && !hasError && (
        <div>
          <p>Total Price: {calculatedPrice.toFixed(2)}€</p>
          <button className="purchase-button" onClick={handlePurchase}>Confirm Purchase</button>
        </div>
      )}
    </div>
  )
};

export default ProductOptions;
