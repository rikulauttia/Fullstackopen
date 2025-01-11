import { useEffect, useState } from "react";

import Entries from "./components/Entries";
import EntryForm from "./components/EntryForm";
import { getAllEntries } from "./services/diaryService";
import { DiaryEntry } from "./types";

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    getAllEntries().then((data) => {
      setDiaryEntries(data);
    });
  }, []);

  return (
    <div>
      <Entries entries={diaryEntries} />
      <EntryForm
        setDiaryEntries={setDiaryEntries}
        diaryEntries={diaryEntries}
      />
    </div>
  );
};

export default App;
