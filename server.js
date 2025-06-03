// server.js
const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const appealsRoutes = require('./routes/appealsRoutes');

dotenv.config();
const app = express();

app.use(express.json({ limit: '1mb' })); // лимит на входящие JSON-запросы
app.use(helmet());
app.use(morgan('dev'));

app.use('/api', appealsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Мониторинг памяти
setInterval(() => {
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  const limit = 256;
  if (used > limit * 0.9) {
    console.warn(`⚠️ Используется много памяти: ${Math.round(used)} MB`);
  }
}, 10000);

