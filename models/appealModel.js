// models/appealModel.js
const db = require('../db');

const createAppeal = (topic, message) => {
  return db.execute(
    'INSERT INTO appeals (topic, message) VALUES (?, ?)',
    [topic, message]
  );
};

const updateStatus = (id, status, textField, text) => {
  return db.execute(
    `UPDATE appeals SET status = ?, ${textField} = ? WHERE id = ?`,
    [status, text, id]
  );
};

// Обновленная функция getAppeals с пагинацией и сортировкой
const getAppeals = (startDate, endDate, limit = 50, offset = 0) => {
  let query = 'SELECT * FROM appeals';
  let params = [];

  if (startDate && endDate) {
    query += ' WHERE created_at BETWEEN ? AND ?';
    params = [startDate, endDate];
  } else if (startDate) {
    query += ' WHERE DATE(created_at) = ?';
    params = [startDate];
  }

  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);

  return db.execute(query, params);
};

const cancelAllInWork = () => {
  return db.execute(
    `UPDATE appeals SET status = 'Отменено', cancellation_reason = 'Автоматическая отмена' WHERE status = 'В работе'`
  );
};

module.exports = {
  createAppeal,
  updateStatus,
  getAppeals,
  cancelAllInWork
};

