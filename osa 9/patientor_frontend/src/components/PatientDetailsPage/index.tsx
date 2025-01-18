import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Female, Male, Transgender } from "@mui/icons-material";

import patientService from "../../services/patients";
import { Diagnosis, Entry, Patient } from "../../types";
import AddEntryForm from "../AddEntryModal/AddEntryForm";
import EntryDetails from "../EntryDetails";

const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [, setDiagnoses] = useState<Diagnosis[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const handleAddEntry = async (newEntry: Omit<Entry, "id">) => {
    if (!id) return;
    try {
      const updatedPatient = await patientService.addEntry(id, newEntry);
      setPatient(updatedPatient);
      setShowForm(false);
    } catch (error) {
      setErrorMessage("Failed adding entry! Please check your input values!!!");
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

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
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add new Entry"}
      </button>
      {showForm && (
        <AddEntryForm
          onSubmit={handleAddEntry}
          onCancel={() => setShowForm(false)}
        />
      )}
      {patient.entries.map((entry: Entry) => (
        <EntryDetails key={entry.id} entry={entry}></EntryDetails>
      ))}
    </div>
  );
};

export default PatientDetailsPage;
