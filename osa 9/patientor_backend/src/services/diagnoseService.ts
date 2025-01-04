import data from "../../data/diagnoses";
import { Diagnosis } from "../types";

const getDiagnosis = (): Diagnosis[] => {
  return data;
};

export default {
  getDiagnosis,
};
