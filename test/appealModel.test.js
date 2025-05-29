const db = require('../db');
const model = require('../models/appealModel');

jest.mock('../db'); // мокируем весь модуль db

describe('Appeal Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('createAppeal should insert into DB', async () => {
    db.execute.mockResolvedValue([{ insertId: 1 }]);

    const result = await model.createAppeal('Тема', 'Сообщение');
    expect(db.execute).toHaveBeenCalledWith(
      'INSERT INTO appeals (topic, message) VALUES (?, ?)',
      ['Тема', 'Сообщение']
    );
    expect(result[0].insertId).toBe(1);
  });

  test('updateStatus should update DB record', async () => {
    db.execute.mockResolvedValue([{}]);

    await model.updateStatus(1, 'В работе', 'resolution', null);
    expect(db.execute).toHaveBeenCalledWith(
      'UPDATE appeals SET status = ?, resolution = ? WHERE id = ?',
      ['В работе', null, 1]
    );
  });

  test('getAppeals should query DB with date range and pagination', async () => {
    db.execute.mockResolvedValue([[{ id: 1, topic: 'Test' }]]);

    const [rows] = await model.getAppeals('2025-01-01', '2025-01-10', 10, 0);

    expect(db.execute).toHaveBeenCalledWith(
      expect.stringContaining('WHERE created_at BETWEEN ? AND ? ORDER BY created_at DESC LIMIT ? OFFSET ?'),
      ['2025-01-01', '2025-01-10', 10, 0]
    );
    expect(rows).toEqual([{ id: 1, topic: 'Test' }]);
  });
});
