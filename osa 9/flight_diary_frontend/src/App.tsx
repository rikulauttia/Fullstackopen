import { useEffect, useState } from "react";

import Entries from "./components/Entries";
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
    </div>
  );
};

export default App;
