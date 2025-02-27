const express = require('express');
const router = express.Router();

// Тимчасові тестові дані
const sampleData = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" }
];

// Маршрут для отримання даних
router.get('/data', (req, res) => {
  res.json(sampleData);
});

module.exports = router;
