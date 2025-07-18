import React, { useEffect, useState } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then(setQuestions);
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(deletedId) {
    const updated = questions.filter((q) => q.id !== deletedId);
    setQuestions(updated);
  }

  function handleUpdateQuestion(updatedQuestion) {
    const updated = questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updated);
  }

  function handleUpdateCorrectAnswer(updatedQuestion) {
  const updatedQuestions = questions.map((q) =>
    q.id === updatedQuestion.id ? updatedQuestion : q
  );
  setQuestions(updatedQuestions);
}


  return (
    <section>
      <h1>Quiz Questions</h1>
      <nav>
        <button onClick={() => setPage("List")}>View Questions</button>
        <button onClick={() => setPage("Form")}>New Question</button>
      </nav>
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDelete={handleDeleteQuestion}
          onUpdate={handleUpdateQuestion}
          onUpdateCorrectAnswer={handleUpdateCorrectAnswer}
        />
      )}
    </section>
  );
}

export default App;
