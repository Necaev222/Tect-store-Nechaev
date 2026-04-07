const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "egor228335",
    database: "college_project"
});

db.connect((err) => {
    if(err) {
        console.error('Ошибка подключение', err);
        return;
    }
    console.log('Подключение к MySQL');
});


app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if(err) {
            res.status(500).send("Ошибка");
            return;
        }
        res.json(result);
    });
});

app.post("/users", (req, res) => {
  const { username, email, password } = req.body;

  db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password],
    (err, result) => {
      if (err) {
        res.status(500).send("Ошибка");
        return;
      }

      res.send("Пользователь добавлен");
    }
  );
});

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`)
});