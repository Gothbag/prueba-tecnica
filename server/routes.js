const { Router } = require('express');

const CalculatPriceController = require('./controllers/calculate-price');
const PurchaseController = require('./controllers/purchase');

const router = Router();

router.get('/calculate', CalculatPriceController.calculateTotalPrice);
router.post('/purchase', PurchaseController.purchase);

module.exports = router;
