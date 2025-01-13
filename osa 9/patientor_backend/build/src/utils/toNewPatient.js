"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const types_1 = require("../types");
const newPatientSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    dateOfBirth: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    ssn: zod_1.z.string().min(1, "SSN is required"),
    gender: zod_1.z.nativeEnum(types_1.Gender, {
        errorMap: () => ({ message: "Invalid gender" }),
    }),
    occupation: zod_1.z.string().min(1, "Occupation is required"),
});
const toNewPatient = (object) => {
    try {
        // Validate and parse the input object
        const parsedPatient = newPatientSchema.parse(object);
        return parsedPatient; // Cast to NewPatient type (safe because of Zod validation)
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            throw new Error(`Validation error: ${error.errors.map((e) => e.message).join(", ")}`);
        }
        throw error; // Rethrow other errors
    }
};
exports.default = toNewPatient;
