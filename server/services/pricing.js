class PricingService {
  static COLOR_MONTHLY_PRICE = 14.99;
  static COLOR_YEARLY_PRICE = 89.99;
  static INSIDER_MONTHLY_PRICE = 39.99;
  static INSIDER_YEARLY_PRICE = 299;

  calculatePrice(purchase) {
    const { name, quantity, duration } = purchase;
    let totalPrice = 0;

    switch (name) {
      case 'color':
        totalPrice = this.calculateColorPrice(quantity, duration);
        break;
      case 'insider':
        totalPrice = this.calculateInsiderPrice(quantity, duration);
        break;
      case 'both':
        totalPrice = this.calculateBothProductsPrice(quantity, duration);
        break;
    }

    return totalPrice;
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

  calculateBothProductsPrice(quantity) {
    const colorPrice = quantity === 1 ? PricingService.COLOR_MONTHLY_PRICE : PricingService.COLOR_YEARLY_PRICE;
    const insiderPrice = quantity === 1 ? PricingService.INSIDER_MONTHLY_PRICE : PricingService.INSIDER_YEARLY_PRICE;
    const total = colorPrice + insiderPrice;

    const discount = quantity === 1 ? 0.1 : 0.2;
    return total * quantity * (1 - discount);
  }
}

module.exports = PricingService;
