import express from "express";

import { calculateBmi } from "./bmiCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const heightNumber = Number(height);
  const weightNumber = Number(weight);

  if (heightNumber <= 0 || weightNumber <= 0) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(heightNumber, weightNumber);
  return res.json({
    weight: weightNumber,
    height: heightNumber,
    bmi,
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
