import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Female, Male, Transgender } from "@mui/icons-material";

import patientService from "../../services/patients";
import { Diagnosis, Entry, Patient } from "../../types";
import EntryDetails from "../EntryDetails";

const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patientData = await patientService.getPatient(id);
        setPatient(patientData);
      }
    };

    const fetchDiagnoses = async () => {
      const diagnosesData = await patientService.getDiagnoses();
      setDiagnoses(diagnosesData);
    };
    fetchPatient();
    fetchDiagnoses();
  }, [id]);

  if (!patient) {
    return <p>Loading...</p>;
  }

  const genderIcon = () => {
    switch (patient.gender) {
      case "male":
        return <Male />;
      case "female":
        return <Female />;
      default:
        return <Transgender />;
    }
  };

  return (
    <div>
      <h2>
        {patient.name} {genderIcon()}
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>date of birth: {patient.dateOfBirth}</p>
      <h3>Entries</h3>
      {patient.entries.map((entry: Entry) => (
        <EntryDetails key={entry.id} entry={entry}></EntryDetails>
      ))}
    </div>
  );
};

export default PatientDetailsPage;
