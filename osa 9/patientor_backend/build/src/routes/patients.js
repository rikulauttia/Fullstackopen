"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const toNewEntry_1 = __importDefault(require("../utils/toNewEntry"));
const toNewPatient_1 = __importDefault(require("../utils/toNewPatient"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send(patientService_1.default.getNonSensitivePatient());
});
router.get("/:id", (req, res) => {
    const patient = patientService_1.default.findPatientById(req.params.id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.status(404).send({ error: "Patient not found!" });
    }
});
router.post("/", (req, res) => {
    try {
        const newPatient = (0, toNewPatient_1.default)(req.body);
        const addedPatient = patientService_1.default.addPatient(newPatient);
        res.send(addedPatient);
    }
    catch (error) {
        let errorMessage = "Something went wrong!";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
router.post("/:id/entries", (req, res) => {
    try {
        const patientId = req.params.id;
        const newEntry = (0, toNewEntry_1.default)(req.body);
        const updatedPatient = patientService_1.default.addEntry(patientId, newEntry);
        res.json(updatedPatient);
    }
    catch (error) {
        let errorMessage = "Something went wrong!";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
