// routes/appealsRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/appealsController');
const validate = require('../middlewares/validate');
const validator = require('../validators/appealsValidator');

router.post('/appeals', validator.createAppealValidation, validate, controller.createAppeal);
router.post('/appeals/:id/take', controller.takeAppeal);
router.post('/appeals/:id/complete', validator.completeAppealValidation, validate, controller.completeAppeal);
router.post('/appeals/:id/cancel', validator.cancelAppealValidation, validate, controller.cancelAppeal);
router.get('/appeals', controller.getAppeals);
router.post('/appeals/cancel-all-in-work', controller.cancelAllInWork);

module.exports = router;

