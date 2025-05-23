CREATE DATABASE appeals_db;

USE appeals_db;

CREATE TABLE appeals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  topic VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('Новое', 'В работе', 'Завершено', 'Отменено') DEFAULT 'Новое',
  resolution TEXT,
  cancellation_reason TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
