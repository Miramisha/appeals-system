const { body, param, query } = require('express-validator');

exports.validateCreateAppeal = [
  body('topic')
    .notEmpty().withMessage('Поле "topic" обязательно')
    .isLength({ max: 255 }).withMessage('Максимальная длина "topic" — 255 символов'),
  body('message')
    .notEmpty().withMessage('Поле "message" обязательно'),
];

exports.validateCompleteAppeal = [
  body('resolution')
    .notEmpty().withMessage('Поле "resolution" обязательно'),
];

exports.validateCancelAppeal = [
  body('reason')
    .notEmpty().withMessage('Поле "reason" обязательно'),
];

exports.validateAppealIdParam = [
  param('id')
    .isInt({ min: 1 }).withMessage('ID обращения должен быть положительным числом'),
];

exports.validateDateFilters = [
  query('date')
    .optional().isISO8601().withMessage('Дата должна быть в формате YYYY-MM-DD'),
  query('start')
    .optional().isISO8601().withMessage('Дата "start" должна быть в формате YYYY-MM-DD'),
  query('end')
    .optional().isISO8601().withMessage('Дата "end" должна быть в формате YYYY-MM-DD'),
];