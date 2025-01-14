import { v1 as uuid } from "uuid";

import data from "../../data/patients";
import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from "../types";

const patients: Patient[] = data;

const getNonSensitivePatient = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (details: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...details,
  };
  data.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, newEntry: NewEntry): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    throw new Error("Error! Patient not found!");
  }
  const entry: Entry = {
    id: String(Math.random()),
    ...newEntry,
  };

  patient.entries.push(entry);
  return patient;
};

const findPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

export default {
  getNonSensitivePatient,
  addPatient,
  findPatientById,
  addEntry,
};
