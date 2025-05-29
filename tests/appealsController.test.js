const request = require('supertest');
const express = require('express');
const appealsRoutes = require('../routes/appealsRoutes');
const model = require('../models/appealModel');

jest.mock('../models/appealModel');

const app = express();
app.use(express.json());
app.use('/api', appealsRoutes);

describe('Appeals API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('POST /api/appeals - create appeal', async () => {
    model.createAppeal.mockResolvedValue([{ insertId: 42 }]);

    const res = await request(app)
      .post('/api/appeals')
      .send({ topic: 'Тест', message: 'Текст' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ id: 42 });
    expect(model.createAppeal).toHaveBeenCalledWith('Тест', 'Текст');
  });

  test('POST /api/appeals/:id/take - take appeal in work', async () => {
    model.updateStatus.mockResolvedValue([{}]);

    const res = await request(app)
      .post('/api/appeals/1/take');

    expect(res.statusCode).toBe(200);
    expect(model.updateStatus).toHaveBeenCalledWith('1', 'В работе', 'resolution', null);
  });

  test('GET /api/appeals - get appeals with pagination', async () => {
    const mockRows = [{ id: 1, topic: 'Тема' }];
    model.getAppeals.mockResolvedValue([mockRows]);

    const res = await request(app)
      .get('/api/appeals')
      .query({ page: 1, limit: 10 });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockRows);
    expect(model.getAppeals).toHaveBeenCalledWith(undefined, undefined, 10, 0);
  });
});
