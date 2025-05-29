// controllers/appealsController.js
const model = require('../models/appealModel');

exports.createAppeal = async (req, res) => {
  const { topic, message } = req.body;
  if (!topic || !message) return res.status(400).send('Missing topic or message');
  try {
    const [result] = await model.createAppeal(topic, message);
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.takeAppeal = async (req, res) => {
  try {
    await model.updateStatus(req.params.id, 'В работе', 'resolution', null);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.completeAppeal = async (req, res) => {
  const { resolution } = req.body;
  if (!resolution) return res.status(400).send('Missing resolution text');
  try {
    await model.updateStatus(req.params.id, 'Завершено', 'resolution', resolution);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelAppeal = async (req, res) => {
  const { reason } = req.body;
  if (!reason) return res.status(400).send('Missing cancellation reason');
  try {
    await model.updateStatus(req.params.id, 'Отменено', 'cancellation_reason', reason);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAppeals = async (req, res) => {
  const { date, start, end, page = 1, limit = 50 } = req.query;
  const safeLimit = Math.min(parseInt(limit), 100); // максимум 100 записей за раз
  const offset = (parseInt(page) - 1) * safeLimit;

  try {
    const [rows] = await model.getAppeals(date || start, date ? date : end, safeLimit, offset);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelAllInWork = async (req, res) => {
  try {
    await model.cancelAllInWork();
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
