import data from "../../data/patients";
import { NonSensitivePatient, Patient } from "../types";

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

export default {
  getNonSensitivePatient,
};
