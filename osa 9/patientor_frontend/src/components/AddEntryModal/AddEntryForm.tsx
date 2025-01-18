import { useEffect, useState } from "react";

import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import patientService from "../../services/patients";
import {
  Diagnosis,
  Entry,
  HealthCheckFormValues,
  HealthCheckRating,
  HospitalFormValues,
  OccupationalHealthcareFormValues,
} from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (entry: Omit<Entry, "id">) => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [entryType, setEntryType] = useState<
    "HealthCheck" | "Hospital" | "OccupationalHealthcare"
  >("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<
    number | undefined
  >();
  const [diagnosisCodes] = useState<string>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const fetchedDiagnoses = await patientService.getDiagnoses();
      setDiagnoses(fetchedDiagnoses);
    };
    fetchDiagnoses();
  }, []);

  const handleSubmit = () => {
    if (!description || !date || !specialist) {
      setErrorMessage("All fields must be filled!");
      return;
    }

    try {
      let newEntry:
        | HealthCheckFormValues
        | OccupationalHealthcareFormValues
        | HospitalFormValues;

      switch (entryType) {
        case "HealthCheck":
          newEntry = {
            type: "HealthCheck",
            description,
            date,
            specialist,
            healthCheckRating: healthCheckRating ?? HealthCheckRating.Healthy,
            diagnosisCodes: diagnosisCodes
              ? diagnosisCodes.split(",").map((code) => code.trim())
              : [],
          };
          break;
        case "OccupationalHealthcare":
          newEntry = {
            type: "OccupationalHealthcare",
            description,
            date,
            specialist,
            employerName,
            sickLeave:
              sickLeaveStartDate && sickLeaveEndDate
                ? {
                    startDate: sickLeaveStartDate,
                    endDate: sickLeaveEndDate,
                  }
                : undefined,
            diagnosisCodes: diagnosisCodes
              ? diagnosisCodes.split(",").map((code) => code.trim())
              : [],
          };
          break;
        case "Hospital":
          newEntry = {
            type: "Hospital",
            description,
            date,
            specialist,
            discharge: {
              date: dischargeDate,
              criteria: dischargeCriteria,
            },
            diagnosisCodes: diagnosisCodes
              ? diagnosisCodes.split(",").map((code) => code.trim())
              : [],
          };
          break;
        default:
          throw new Error("Unknown entry type!!!");
      }
      onSubmit(newEntry);
    } catch (error) {
      setErrorMessage("a error occured while submitting the form!");
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          New Entry
        </Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <br></br>
              <InputLabel>Choose Entry Type:</InputLabel>
              <Select
                value={entryType}
                onChange={(e) =>
                  setEntryType(
                    e.target.value as
                      | "HealthCheck"
                      | "Hospital"
                      | "OccupationalHealthcare"
                  )
                }
              >
                <MenuItem value="HealthCheck">Health Check</MenuItem>
                <MenuItem value="OccupationalHealthcare">
                  Occupational Healthcare
                </MenuItem>
                <MenuItem value="Hospital">Hospital</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Specialist"
              value={specialist}
              onChange={(e) => setSpecialist(e.target.value)}
            />
          </Grid>
          {entryType === "HealthCheck" && (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Health Check Rating</InputLabel>
                <Select
                  value={healthCheckRating ?? ""}
                  onChange={(e) =>
                    setHealthCheckRating(
                      Number(e.target.value) as HealthCheckRating
                    )
                  }
                >
                  <MenuItem value={HealthCheckRating.Healthy}>
                    Healthy (0)
                  </MenuItem>
                  <MenuItem value={HealthCheckRating.LowRisk}>
                    Low Risk (1)
                  </MenuItem>
                  <MenuItem value={HealthCheckRating.HighRisk}>
                    High Risk (2)
                  </MenuItem>
                  <MenuItem value={HealthCheckRating.CriticalRisk}>
                    Critical Risk (3)
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
          {entryType === "OccupationalHealthcare" && (
            <>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Employer Name"
                  value={employerName}
                  onChange={(e) => setEmployerName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Sick Leave Start Date"
                  value={sickLeaveStartDate}
                  onChange={(e) => setSickLeaveStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Sick Leave End Date"
                  value={sickLeaveEndDate}
                  onChange={(e) => setSickLeaveEndDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </>
          )}
          {entryType === "Hospital" && (
            <>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Discharge Date"
                  value={dischargeDate}
                  onChange={(e) => setDischargeDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Discharge Criteria"
                  value={dischargeCriteria}
                  onChange={(e) => setDischargeCriteria(e.target.value)}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Diagnosis Codes</InputLabel>
              <Select
                multiple
                value={selectedCodes}
                onChange={(e) => setSelectedCodes(e.target.value as string[])}
                renderValue={(selected) => selected.join(", ")}
              >
                {diagnoses.map((diagnosis) => (
                  <MenuItem key={diagnosis.code} value={diagnosis.code}>
                    {diagnosis.code} - {diagnosis.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddEntryForm;
