// routes/appealsRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/appealsController');
const validate = require('../middlewares/validate');
const {
  validateCreateAppeal,
  validateCompleteAppeal,
  validateCancelAppeal,
  validateAppealIdParam,
  validateDateFilters
} = require('../validators/appealsValidator');

router.post(
  '/appeals',
  validateCreateAppeal,
  validate,
  controller.createAppeal
);

router.post(
  '/appeals/:id/take',
  validateAppealIdParam,
  validate,
  controller.takeAppeal
);

router.post(
  '/appeals/:id/complete',
  validateAppealIdParam,
  validateCompleteAppeal,
  validate,
  controller.completeAppeal
);

router.post(
  '/appeals/:id/cancel',
  validateAppealIdParam,
  validateCancelAppeal,
  validate,
  controller.cancelAppeal
);

router.get(
  '/appeals',
  validateDateFilters,
  validate,
  controller.getAppeals
);

router.post('/appeals/cancel-all-in-work', controller.cancelAllInWork);

module.exports = router;

