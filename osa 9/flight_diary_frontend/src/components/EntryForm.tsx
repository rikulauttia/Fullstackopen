import { useState } from "react";

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

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiaryEntry({ date, visibility, weather, comment }).then((data) => {
      setDiaryEntries(diaryEntries.concat(data));
    });
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <div>
      <h2>Add New Entry</h2>
      <form onSubmit={entryCreation}>
        <div>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Weather:
            <input
              type="text"
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Visibility:
            <input
              type="text"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Comment:
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default EntryForm;
