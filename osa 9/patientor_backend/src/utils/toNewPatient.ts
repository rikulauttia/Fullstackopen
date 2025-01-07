import { z } from "zod";

import { Gender, NewPatient } from "../types";

const newPatientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  ssn: z.string().min(1, "SSN is required"),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({ message: "Invalid gender" }),
  }),
  occupation: z.string().min(1, "Occupation is required"),
});

const toNewPatient = (object: unknown): NewPatient => {
  try {
    // Validate and parse the input object
    const parsedPatient = newPatientSchema.parse(object);
    return parsedPatient as NewPatient; // Cast to NewPatient type (safe because of Zod validation)
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `Validation error: ${error.errors.map((e) => e.message).join(", ")}`
      );
    }
    throw error; // Rethrow other errors
  }
};

export default toNewPatient;
