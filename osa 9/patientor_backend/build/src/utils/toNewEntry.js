"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const types_1 = require("../types");
const baseEntrySchema = zod_1.z.object({
    description: zod_1.z.string().min(1, "Description is required"),
    date: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    specialist: zod_1.z.string().min(1, "Specialist is required"),
    diagnosisCodes: zod_1.z.array(zod_1.z.string()).optional(),
});
const healthCheckEntrySchema = baseEntrySchema.extend({
    type: zod_1.z.literal("HealthCheck"),
    healthCheckRating: zod_1.z.nativeEnum(types_1.HealthCheckRating, {
        errorMap: () => ({ message: "Invalid health check rating" }),
    }),
});
const hospitalEntrySchema = baseEntrySchema.extend({
    type: zod_1.z.literal("Hospital"),
    discharge: zod_1.z.object({
        date: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
            message: "Invalid discharge date format",
        }),
        criteria: zod_1.z.string().min(1, "Discharge criteria is required"),
    }),
});
const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
    type: zod_1.z.literal("OccupationalHealthcare"),
    employerName: zod_1.z.string().min(1, "Employer name is required"),
    sickLeave: zod_1.z
        .object({
        startDate: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
            message: "Invalid start date format",
        }),
        endDate: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
            message: "Invalid end date format",
        }),
    })
        .optional(),
});
const newEntrySchema = zod_1.z.union([
    occupationalHealthcareEntrySchema,
    hospitalEntrySchema,
    healthCheckEntrySchema,
]);
const toNewEntry = (object) => {
    try {
        return newEntrySchema.parse(object);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            throw new Error(`Validation error: ${error.errors.map((e) => e.message).join(", ")}`);
        }
        throw error; // Rethrow other errors
    }
};
exports.default = toNewEntry;
