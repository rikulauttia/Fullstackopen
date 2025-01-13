import { v1 as uuid } from "uuid";

import data from "../../data/patients";
import { NewPatient, NonSensitivePatient, Patient } from "../types";

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

const findPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

export default {
  getNonSensitivePatient,
  addPatient,
  findPatientById,
};
