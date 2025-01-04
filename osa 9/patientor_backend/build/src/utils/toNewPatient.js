"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const toHelpTypes_1 = require("./toHelpTypes");
const toNewPatient = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("name" in object &&
        "dateOfBirth" in object &&
        "ssn" in object &&
        "gender" in object &&
        "occupation" in object) {
        const newPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
        };
        return newPatient;
    }
    throw new Error("Incorrect data: some fields are missing");
};
exports.default = toNewPatient;
const parseName = (name) => {
    if (!(0, toHelpTypes_1.isString)(name)) {
        throw new Error("Incorrect name");
    }
    return name;
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!(0, toHelpTypes_1.isString)(dateOfBirth) || !(0, toHelpTypes_1.isDate)(dateOfBirth)) {
        throw new Error("Incorrect date: " + dateOfBirth);
    }
    return dateOfBirth;
};
const parseSsn = (ssn) => {
    if (!(0, toHelpTypes_1.isString)(ssn)) {
        throw new Error("Incorrect ssn: " + ssn);
    }
    return ssn;
};
const isGender = (param) => {
    return Object.values(types_1.Gender)
        .map((v) => v.toString())
        .includes(param);
};
const parseGender = (gender) => {
    if (!(0, toHelpTypes_1.isString)(gender) || !isGender(gender)) {
        throw new Error("Incorrect gender: " + gender);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!(0, toHelpTypes_1.isString)(occupation)) {
        throw new Error("Incorrect occupation: " + occupation);
    }
    return occupation;
};
