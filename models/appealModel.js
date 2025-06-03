// models/appealModel.js
const db = require('../db');

const createAppeal = (topic, message) => {
  return db.execute(
    'INSERT INTO appeals (topic, message) VALUES (?, ?)',
    [topic, message]
  );
};

const updateStatus = async (id, status, textField = null, text = null) => {
  let query = 'UPDATE appeals SET status = ?';
  const params = [status];

  if (textField && (textField === 'resolution' || textField === 'cancellation_reason')) {
    query += `, ${textField} = ?`;
    params.push(text);
  }

  query += ' WHERE id = ?';
  params.push(id);

  return db.execute(query, params);
};

const getAppeals = (startDate, endDate) => {
  let query = 'SELECT * FROM appeals';
  let params = [];

  if (startDate && endDate) {
    query += ' WHERE DATE(created_at) BETWEEN ? AND ?';
    params = [startDate, endDate];
  } else if (startDate) {
    query += ' WHERE DATE(created_at) = ?';
    params = [startDate];
  }

  return db.execute(query, params);
};

const cancelAllInWork = () => {
  return db.execute(
    `UPDATE appeals
     SET status = 'Отменено',
         cancellation_reason = 'Автоматическая отмена'
     WHERE status = 'В работе'`
  );
};

const findById = (id) => {
  return db.execute('SELECT * FROM appeals WHERE id = ?', [id]);
};

module.exports = {
  createAppeal,
  updateStatus,
  getAppeals,
  cancelAllInWork,
  findById
};


