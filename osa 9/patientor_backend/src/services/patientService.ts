import { v1 as uuid } from "uuid";

import data from "../../data/patients";
import { NewPatient, NonSensitivePatient, Patient } from "../types";

const patients: Patient[] = data;

const getNonSensitivePatient = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (details: NewPatient): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...details,
  };
  data.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatient,
  addPatient,
};
