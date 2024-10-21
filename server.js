import express from "express";
import cors from "cors"; // Для разрешения CORS
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Для работы с __dirname и __filename в ES-модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000; // Будем использовать порт 3000

// Включаем CORS для всех маршрутов
app.use(cors());

// Загружаем данные из db.json
let dbData;
try {
  const rawData = fs.readFileSync(path.join(__dirname, "db.json"));
  dbData = JSON.parse(rawData);
} catch (error) {
  console.error("Ошибка при чтении db.json:", error);
  dbData = { todos: [] }; // Пустой массив в случае ошибки
}

// Маршрут для получения задач с пагинацией
app.get("/api/todos", (req, res) => {
  const todos = dbData.todos; // Используем задачи из db.json
  const page = parseInt(req.query._page) || 1; // Номер страницы
  const limit = parseInt(req.query._limit) || 10; // Количество элементов на странице

  const start = (page - 1) * limit;
  const end = page * limit;

  const paginatedTodos = todos.slice(start, end);
  const totalPages = Math.ceil(todos.length / limit);

  res.json({
    first: 1,
    prev: page > 1 ? page - 1 : null,
    next: page < totalPages ? page + 1 : null,
    last: totalPages,
    pages: totalPages,
    items: todos.length,
    data: paginatedTodos,
  });
});

// Сервируем статические файлы из папки dist (клиентская часть)
app.use(express.static(path.join(__dirname, "dist")));

// Все остальные маршруты возвращают index.html (SPA поддержка)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
