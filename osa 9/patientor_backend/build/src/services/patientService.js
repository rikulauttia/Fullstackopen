"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const patients = patients_1.default;
const getNonSensitivePatient = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};
const addPatient = (details) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v1)() }, details);
    patients_1.default.push(newPatient);
    return newPatient;
};
const addEntry = (id, newEntry) => {
    const patient = patients.find((p) => p.id === id);
    if (!patient) {
        throw new Error("Error! Patient not found!");
    }
    const entry = Object.assign({ id: String(Math.random()) }, newEntry);
    patient.entries.push(entry);
    return patient;
};
const findPatientById = (id) => {
    return patients.find((patient) => patient.id === id);
};
exports.default = {
    getNonSensitivePatient,
    addPatient,
    findPatientById,
    addEntry,
};
