import React from "react";

function Word({ selectedWords, correctLetters }) {
  console.log(selectedWords);
  const allLetters = selectedWords.split("").map((letter, i) => (
    <span className="letter" key={i}>
      {correctLetters.includes(letter) ? letter : ""}
    </span>
  ));
  return <div>{allLetters}</div>;
}

export default Word;
