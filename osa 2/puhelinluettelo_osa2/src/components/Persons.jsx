import React from "react";

const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map((person, index) => (
        <div key={index}>
          {person.name} {person.number}
          {""}
        </div>
      ))}
    </div>
  );
};

export default Persons;
