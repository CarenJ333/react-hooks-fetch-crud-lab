import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDelete(id));
  }

  function handleCorrectAnswerChange(e) {
    const newIndex = parseInt(e.target.value);
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        onUpdateCorrectAnswer(updatedQuestion);
      });
  }

  const answerOptions = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

   return (
    <li>
      <h4>{prompt}</h4>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleCorrectAnswerChange} aria-label="Correct Answer">
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}


export default QuestionItem;