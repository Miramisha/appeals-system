const { body } = require('express-validator');

exports.createAppealValidation = [
  body('topic')
    .trim()
    .notEmpty().withMessage('Тема обязательна')
    .isLength({ max: 255 }).withMessage('Тема не должна превышать 255 символов'),

  body('message')
    .trim()
    .notEmpty().withMessage('Сообщение обязательно')
    .isLength({ max: 1000 }).withMessage('Сообщение не должно превышать 1000 символов'),
];

exports.completeAppealValidation = [
  body('resolution')
    .trim()
    .notEmpty().withMessage('Решение обязательно')
    .isLength({ max: 1000 }).withMessage('Решение не должно превышать 1000 символов'),
];

exports.cancelAppealValidation = [
  body('reason')
    .trim()
    .notEmpty().withMessage('Причина обязательна')
    .isLength({ max: 1000 }).withMessage('Причина не должна превышать 1000 символов'),
];
