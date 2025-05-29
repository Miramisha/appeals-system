// models/appealModel.js
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
