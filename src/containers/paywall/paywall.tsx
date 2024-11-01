import React, { useState } from 'react';
import { Product, ProductOption } from '../../types';

import './paywall.scss';

const Paywall: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product>('color');
  const [quantity, setQuantity] = useState<number>(1);
  const [duration, setDuration] = useState<'monthly' | 'yearly'>('monthly');
  const [totalPrice, setTotalPrice] = useState(0);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setDuration('monthly'); // Default to monthly for each selection
  };

  const handlePurchase = () => {
    if (!selectedProduct) return;

    const order: ProductOption = {
      name: selectedProduct,
      quantity,
      duration,
    };

    fetch('http://localhost:3000/api/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    }).then((res) => res.json())
      .then((data) => setTotalPrice(data.totalPrice));
  };

  return (
    <div className="paywall">
      <h1>Select Your Subscription</h1>

      <div className="paywall-buttons">
        <button
          className={`paywall-button ${selectedProduct === 'color' ? 'active' : ''}`}
          onClick={() => handleProductSelect('color')}
        >
          Color Subscription
        </button>
        <button
          className={`paywall-button ${selectedProduct === 'insider' ? 'active' : ''}`}
          onClick={() => handleProductSelect('insider')}
        >
          Insider Subscription
        </button>
        <button
          className={`paywall-button ${selectedProduct === 'both' ? 'active' : ''}`}
          onClick={() => handleProductSelect('both')}
        >
          Both Products Subscription
        </button>
      </div>

      {selectedProduct && (
        <div className="paywall-options">
          <label>Quantity:</label>
          <input
            type="number"
            min="1"
            max="100"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          <label>Duration:</label>
          <select value={duration} onChange={(e) => setDuration(e.target.value as 'monthly' | 'yearly')}>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>

          <button onClick={handlePurchase}>
            Purchase for {totalPrice.toFixed(2)}€
          </button>
        </div>
      )}
    </div>
  );
};

export default Paywall;
