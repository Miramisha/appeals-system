// server.js
const express = require('express');
const dotenv = require('dotenv');
const appealsRoutes = require('./routes/appealsRoutes');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api', appealsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.json({limit: '20kb'})) //-условно ограничение максимум 20КБ