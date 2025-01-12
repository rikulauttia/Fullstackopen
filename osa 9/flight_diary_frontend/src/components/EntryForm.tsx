import { useState } from "react";

import axios from "axios";

import { createDiaryEntry } from "../services/diaryService";
import { DiaryEntry } from "../types";

interface EntryFormTypes {
  setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  diaryEntries: DiaryEntry[];
}

const EntryForm = ({ setDiaryEntries, diaryEntries }: EntryFormTypes) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiaryEntry({ date, visibility, weather, comment })
      .then((data) => {
        setDiaryEntries(diaryEntries.concat(data));
        setDate("");
        setVisibility("");
        setWeather("");
        setComment("");
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setErrorMessage(
            error?.response?.data ?? "Failed to creating diary entry!"
          );
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        } else {
          console.error(error);
        }
      });
  };

  return (
    <div>
      <h2>Add New Entry</h2>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <form onSubmit={entryCreation}>
        <div>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>Weather:</label>
          <div>
            <label>
              <input
                type="radio"
                value="sunny"
                name="weather"
                onChange={(e) => setWeather(e.target.value)}
              />
              Sunny
            </label>
            <label>
              <input
                type="radio"
                value="rainy"
                name="weather"
                onChange={(e) => setWeather(e.target.value)}
              />
              Rainy
            </label>
            <label>
              <input
                type="radio"
                value="cloudy"
                name="weather"
                onChange={(e) => setWeather(e.target.value)}
              />
              Cloudy
            </label>
            <label>
              <input
                type="radio"
                value="stormy"
                name="weather"
                onChange={(e) => setWeather(e.target.value)}
              />
              Stormy
            </label>
            <label>
              <input
                type="radio"
                value="windy"
                name="weather"
                onChange={(e) => setWeather(e.target.value)}
              />
              Windy
            </label>
          </div>
        </div>
        <div>
          <label>Visibility:</label>
          <div>
            <label>
              <input
                type="radio"
                value="great"
                name="visibility"
                onChange={(e) => setVisibility(e.target.value)}
              />
              Great
            </label>
            <label>
              <input
                type="radio"
                value="good"
                name="visibility"
                onChange={(e) => setVisibility(e.target.value)}
              />
              Good
            </label>
            <label>
              <input
                type="radio"
                value="ok"
                name="visibility"
                onChange={(e) => setVisibility(e.target.value)}
              />
              Ok
            </label>
            <label>
              <input
                type="radio"
                value="poor"
                name="visibility"
                onChange={(e) => setVisibility(e.target.value)}
              />
              Poor
            </label>
          </div>
        </div>
        <div>
          <label>
            Comment:
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default EntryForm;
