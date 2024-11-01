class PricingService {
  static COLOR_MONTHLY_PRICE = 14.99;
  static COLOR_YEARLY_PRICE = 89.99;
  static INSIDER_MONTHLY_PRICE = 39.99;
  static INSIDER_YEARLY_PRICE = 299;

  calculatePrice(purchase) {
    const { name, quantity, duration } = purchase;
    const parsedQuantity = +quantity;

    if (parsedQuantity < 1 || parsedQuantity > 100) {
      throw new Error('Incorrect number');
    }

    switch (name) {
      case 'color':
        return this.calculateColorPrice(parsedQuantity, duration);
      case 'insider':
        return this.calculateInsiderPrice(parsedQuantity, duration);
      case 'both':
        return this.calculateBothProductsPrice(parsedQuantity, duration);
    }
  }

  calculateColorPrice(quantity, duration) {
    if (quantity === 1) {
      return duration === 'monthly' ? PricingService.COLOR_MONTHLY_PRICE : PricingService.COLOR_YEARLY_PRICE;
    }
    return quantity * PricingService.COLOR_YEARLY_PRICE;
  }

  calculateInsiderPrice(quantity, duration) {
    if (quantity === 1) {
      return duration === 'monthly' ? PricingService.INSIDER_MONTHLY_PRICE : PricingService.INSIDER_YEARLY_PRICE;
    }
    return quantity * PricingService.INSIDER_YEARLY_PRICE;
  }

  calculateBothProductsPrice(quantity, duration) {
    const colorPrice = this.calculateColorPrice(quantity, duration);
    const insiderPrice = this.calculateInsiderPrice(quantity, duration);
    const total = colorPrice + insiderPrice;
    
    const discount = quantity === 1 ? 0.1 : 0.2;
    return total * (1 - discount);
  }
}

module.exports = PricingService;
