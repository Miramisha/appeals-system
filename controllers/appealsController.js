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

const checkAppealExists = async (id, res) => {
  const [rows] = await model.findById(id);
  if (rows.length === 0) {
    res.status(404).send('Обращение не найдено');
    return false;
  }
  return true;
};

exports.takeAppeal = async (req, res) => {
  const { id } = req.params;
  if (!(await checkAppealExists(id, res))) return;

  try {
    await model.updateStatus(id, 'В работе');
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.completeAppeal = async (req, res) => {
  const { id } = req.params;
  const { resolution } = req.body;
  if (!resolution) return res.status(400).send('Missing resolution text');
  if (!(await checkAppealExists(id, res))) return;

  try {
    await model.updateStatus(id, 'Завершено', 'resolution', resolution);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelAppeal = async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;
  if (!reason) return res.status(400).send('Missing cancellation reason');
  if (!(await checkAppealExists(id, res))) return;

  try {
    await model.updateStatus(id, 'Отменено', 'cancellation_reason', reason);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAppeals = async (req, res) => {
  const { date, start, end } = req.query;
  try {
    const [rows] = await model.getAppeals(date || start, date ? date : end);
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

