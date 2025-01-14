import React from "react";

import { LocalHospital, Work } from "@mui/icons-material";
import { Card, CardContent, Typography } from "@mui/material";

import { Entry } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <Card style={{ marginBottom: "1em" }}>
          <CardContent>
            <Typography variant="h6">
              {entry.date} <LocalHospital />
            </Typography>
            <Typography>{entry.description}</Typography>
            <Typography>Diagnosed by {entry.specialist}</Typography>
          </CardContent>
        </Card>
      );

    case "OccupationalHealthcare":
      return (
        <Card style={{ marginBottom: "1em" }}>
          <CardContent>
            <Typography variant="h6">
              {entry.date} <Work />
            </Typography>
            <Typography>{entry.description}</Typography>
            <Typography>Employer: {entry.employerName}</Typography>
            <Typography>Diagnosed by {entry.specialist}</Typography>
          </CardContent>
        </Card>
      );

    case "HealthCheck":
      return (
        <Card style={{ marginBottom: "1em" }}>
          <CardContent>
            <Typography variant="h6">
              {entry.date} <LocalHospital />
            </Typography>
            <Typography>{entry.description}</Typography>
            <Typography>Diagnosed by {entry.specialist}</Typography>
          </CardContent>
        </Card>
      );

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
