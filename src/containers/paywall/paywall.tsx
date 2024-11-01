import React from 'react';

import './paywall.scss';
import usePaywall from './hooks/use-paywall';
import ProductOptions from './components/product-options';

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
          className={`paywall-button ${selectedProduct === 'color' ? 'active' : ''}`}
          onClick={handleSelectColor}
        >
          Color Subscription
        </button>
        <button
          className={`paywall-button ${selectedProduct === 'insider' ? 'active' : ''}`}
          onClick={handleSelectInsider}
        >
          Insider Subscription
        </button>
        <button
          className={`paywall-button ${selectedProduct === 'both' ? 'active' : ''}`}
          onClick={handleSelectBoth}
        >
          Both Products Subscription
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
