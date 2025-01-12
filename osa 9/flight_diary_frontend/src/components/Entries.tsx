import { DiaryEntry } from "../types";

interface EntriesTypes {
  entries: DiaryEntry[];
}

const Entries = ({ entries }: EntriesTypes) => {
  return (
    <div>
      <h1>Diary Entries</h1>
      {entries.map((entry) => {
        return (
          <div key={entry.id}>
            <h3>{entry.date}</h3>
            <p>visibility: {entry.visibility}</p>
            <p>weather: {entry.weather}</p>
            <p>comment: {entry.comment}</p>
            <br></br>
          </div>
        );
      })}
    </div>
  );
};

export default Entries;
