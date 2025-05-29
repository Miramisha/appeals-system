// routes/appealsRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/appealsController');

router.post('/appeals', controller.createAppeal);
router.post('/appeals/:id/take', controller.takeAppeal);
router.post('/appeals/:id/complete', controller.completeAppeal);
router.post('/appeals/:id/cancel', controller.cancelAppeal);
router.get('/appeals', controller.getAppeals);
router.post('/appeals/cancel-all-in-work', controller.cancelAllInWork);

module.exports = router;
