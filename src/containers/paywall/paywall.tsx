import React from 'react';

import './paywall.scss';
import usePaywall from './hooks/use-paywall';
import ProductOptions from './components/product-options';
import { Product } from '../../types';

const Paywall: React.FC = () => {
  const {
    calculatedPrice,
    duration,
    handleCalculatePrice,
    handlePurchase,
    handleSelectBoth,
    handleSelectColor,
    handleSetDuration,
    handleSelectInsider,
    handleSetQuantity,
    quantity,
    selectedProduct,
  } = usePaywall();

  return (
    <div className="paywall">
      <h1>Select Your Subscription</h1>

      <div className="paywall-buttons">
        <button
          className={`paywall-button ${selectedProduct === Product.Color ? 'active' : ''}`}
          onClick={handleSelectColor}
        >
          Color Subscription
        </button>
        <button
          className={`paywall-button ${selectedProduct === Product.Insider ? 'active' : ''}`}
          onClick={handleSelectInsider}
        >
          Insider Subscription
        </button>
        <button
          className={`paywall-button ${selectedProduct === Product.Both ? 'active' : ''}`}
          onClick={handleSelectBoth}
        >
          Color + Insider Subscription
        </button>
      </div>

      {selectedProduct && (<ProductOptions
        calculatedPrice={calculatedPrice}
        duration={duration}
        handleCalculatePrice={handleCalculatePrice}
        handlePurchase={handlePurchase}
        handleSetDuration={handleSetDuration}
        handleSetQuantity={handleSetQuantity}
        quantity={quantity}
      />)}
    </div>
  );
};

export default Paywall;
