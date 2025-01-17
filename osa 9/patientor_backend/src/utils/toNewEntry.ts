import { z } from "zod";

import { HealthCheckRating, NewEntry } from "../types";

const baseEntrySchema = z.object({
  description: z.string().min(1, "Description is required"),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  specialist: z.string().min(1, "Specialist is required"),
  diagnosisCodes: z.array(z.string()).optional(),
});

const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating, {
    errorMap: () => ({ message: "Invalid health check rating" }),
  }),
});

const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid discharge date format!",
    }),
    criteria: z.string().min(1, "Discharge criteria is required"),
  }),
});

const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string().min(1, "Employer name is required"),
  sickLeave: z
    .object({
      startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid start date format",
      }),
      endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid end date format",
      }),
    })
    .optional(),
});

const newEntrySchema = z.union([
  occupationalHealthcareEntrySchema,
  hospitalEntrySchema,
  healthCheckEntrySchema,
]);

const toNewEntry = (object: unknown): NewEntry => {
  try {
    return newEntrySchema.parse(object) as NewEntry;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `Validation error: ${error.errors.map((e) => e.message).join(", ")}`
      );
    }
    throw error; // Rethrow other errors
  }
};

export default toNewEntry;
