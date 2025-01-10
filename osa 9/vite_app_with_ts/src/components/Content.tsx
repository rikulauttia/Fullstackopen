import { CoursePart } from "../App";
import Part from "./Part";

interface ContentProps {
  parts: CoursePart[];
}

const Content = ({ parts }: ContentProps) => {
  return (
    <div>
      {parts.map((course) => (
        <Part key={course.name} part={course} />
      ))}
    </div>
  );
};

export default Content;
