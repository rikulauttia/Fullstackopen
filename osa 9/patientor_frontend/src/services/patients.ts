import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Diagnosis, Patient, PatientFormValues } from "../types";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return data;
};

const getDiagnoses = async (): Promise<Diagnosis[]> => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

export default {
  getAll,
  getPatient,
  create,
  getDiagnoses,
};
