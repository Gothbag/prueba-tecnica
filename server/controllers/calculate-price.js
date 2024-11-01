const PricingService = require('../services/pricing');

class CalculatePriceController {
  pricingService;

  constructor() {
    this.pricingService = new PricingService();
  }

  calculateTotalPrice = (req, res) => {
    const { name, quantity, duration } = req.query;

    if (!name || !quantity || !duration) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    try {
      const totalPrice = this.pricingService.calculatePrice({ name, quantity, duration });
      res.json({ totalPrice });
    } catch (error) {
      res.status(500).json({ error: 'Failed to calculate price' });
    }
  };
}

module.exports = new CalculatePriceController();
