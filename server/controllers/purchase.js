const PricingService = require('../services/pricing');

class PurchaseController {
  pricingService;

  constructor() {
    this.pricingService = new PricingService();
  }

  purchase = (req, res) => {
    const { name, quantity, duration } = req.body;

    if (!name || !quantity || !duration) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    try {
      const totalPrice = this.pricingService.calculatePrice({ name, quantity, duration });
      res.status(201).json({ totalPrice });
    } catch (error) {
      res.status(500).json({ error: 'Failed to make purchase' });
    }
  };
}

module.exports = new PurchaseController();