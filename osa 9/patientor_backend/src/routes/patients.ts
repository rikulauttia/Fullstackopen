import express from "express";

import patientService from "../services/patientService";
import toNewEntry from "../utils/toNewEntry";
import toNewPatient from "../utils/toNewPatient";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatient());
});

router.get("/:id", (req, res) => {
  const patient = patientService.findPatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({ error: "Patient not found!" });
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.send(addedPatient);
  } catch (error: unknown) {
    let errorMessage: string = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const patientId = req.params.id;
    const newEntry = toNewEntry(req.body);
    const updatedPatient = patientService.addEntry(patientId, newEntry);
    res.json(updatedPatient);
  } catch (error: unknown) {
    let errorMessage: string = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
