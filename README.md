# 📨Appeals System

Простая система работы с обращениями (заявками), реализованная на Node.js + Express + MySQL. Поддерживает создание обращений, смену статуса, фильтрацию по дате и массовую отмену заявок.


## 🚀Возможности
- 📥 Создание обращения (анонимно)
- ⚙️ Взятие обращения в работу
- ✅ Завершение обращения с решением
- ❌ Отмена обращения с указанием причины
- 📅 Получение списка обращений по дате или диапазону
- 🔄 Массовая отмена всех "в работе"

## 🔧 Используемые технологии:
- Node.js
- Express.js
- MySQL
- dotenv

---

## 📁 Структура проекта:
appeals-system/
  controllers/ # Логика обработки запросов
  models/ # SQL-запросы и взаимодействие с БД
  routes/ # Маршруты Express
  db.js # Подключение к MySQL
  server.js # Запуск сервера
  .env # Настройки подключения
  .gitignore # Игнорируемые файлы
  README.md # Описание проекта

## 2. Установи зависимости:
npm install

## 3. Настрой .env файл:
Создай файл ".env" в корне проекта и вставь туда:

DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=appeals_db
PORT=3000


## 4. Создание базы данных и таблицы:
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

## 5. Запусти сервер:
node server.js

## 💡Примеры JSON-запросов:

1. Создать обращение:
{
  "topic": "Ошибка на сайте",
  "message": "Форма обратной связи не работает"
}
---------------------------------------------------
2. Завершить обращение:
{
  "resolution": "Проблема решена. Обновили скрипт."
}
---------------------------------------------------
3. Отменить обращение:
{
  "reason": "Уже не актуально"
}


