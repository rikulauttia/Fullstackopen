import express from "express";

import { calculateBmi } from "./bmiCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (!req.query.height || !req.query.weight)
    res.status(404).json({ error: "malformatted parameters" });
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight))
    res.status(404).json({ error: "malformatted parameters" });
  const bmiDecision: string = calculateBmi(height, weight);
  res.json({
    weight: weight,
    height: height,
    bmi: bmiDecision,
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
