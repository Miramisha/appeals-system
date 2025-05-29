// controllers/appealsController.js
exports.getAppeals = async (req, res) => {
  const { date, start, end, page = 1, limit = 50 } = req.query;
  const safeLimit = Math.min(parseInt(limit), 100); // максимум 100
  const offset = (parseInt(page) - 1) * safeLimit;

  try {
    const [rows] = await model.getAppeals(date || start, date ? date : end, safeLimit, offset);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
