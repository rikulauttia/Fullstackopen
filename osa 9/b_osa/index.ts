import express from "express";

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

interface exerciseValues {
  dailyHours: Array<number>;
  target: number;
}

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

app.post("/exercises", (req, res) => {
  if (!req.body) res.status(400).json({ error: "request body missing..." });
  const { dailyHours, target }: exerciseValues = req.body as exerciseValues;

  if (!dailyHours || !target)
    res.status(400).json({ error: "parameters missing..." });
  if (dailyHours.find((d: number) => isNaN(d)) || isNaN(target))
    res.status(400).json({ error: "malformatted parameters" });

  const result = calculateExercises(dailyHours, target);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
