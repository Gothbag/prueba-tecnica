const { Router } = require('express');

const PurchaseController = require('./controllers/purchase');

const router = Router();

router.post('/purchase', PurchaseController.calculateTotalPrice);

module.exports = router;
