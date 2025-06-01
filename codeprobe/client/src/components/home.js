import axios from "axios";
import { useState } from "react";
import Sum from "../problems/sum";
import Greatest from "../problems/greatest";
import Highest from "../problems/highest";

function SimpleButton() {
  const [list, setList] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(null);

  function getQuestionsList() {
    if (showQuestions) {
      setShowQuestions(false);
    } else {
      axios
        .get("http://localhost:3005/problems")
        .then((response) => {
          setList(response.data);
          setShowQuestions(true);
        })
        .catch(() => {
          setList([]);
          setShowQuestions(false);
        });
    }
  }

  const renderComponent = (id) => {
    switch (id) {
      case "1":
        return <Sum />;
      case "2":
        return <Greatest />;
      case "3":
        return <Highest />;
      default:
        return null;
    }
  };

  const toggleEditor = (id) => {
    setSelectedProblemId((prev) => (prev === id ? null : id));
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "6rem 0 0 0" }}>
      <h1 style={{ textAlign: "center" }}>CodeProbe</h1>
      <p
        style={{
          textAlign: "center",
          fontSize: "1rem",
          color: "#333",
          marginTop: "1rem",
        }}
      >
        This assessment evaluates your foundational knowledge of JavaScript.
      </p>
      <p
        style={{
          textAlign: "center",
          fontSize: "0.95rem",
          color: "#555",
          marginBottom: "2rem",
        }}
      >
        Click below to get started!
      </p>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <button onClick={getQuestionsList}>
          {showQuestions ? "Hide Questions" : "Get Coding Questions"}
        </button>
      </div>

      {showQuestions &&
        list?.map((i) => (
          <div
            key={i.id}
            style={{
              background: "#d0cfcf",
              color: "white",
              padding: "1rem",
              borderRadius: "10px",
              marginBottom: "2rem",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div
              style={{ fontSize: "1.1rem", fontWeight: "bold", color: "black" }}
            >
              {i.title}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "0.5rem",
              }}
            >
              <span style={{ color: "black" }}>
                <strong>Difficulty:</strong>{" "}
                <span style={{ fontWeight: "normal" }}>
                  {i.difficulty.charAt(0).toUpperCase() +
                    i.difficulty.slice(1).toLowerCase()}
                </span>
              </span>
              <button
                style={{ backgroundColor: "black", color: "white" }}
                onClick={() => toggleEditor(i.id)}
              >
                {selectedProblemId === i.id ? "Hide" : "Solve"}
              </button>
            </div>

            {selectedProblemId === i.id && (
              <div style={{ marginTop: "1.5rem" }}>{renderComponent(i.id)}</div>
            )}
          </div>
        ))}
    </div>
  );
}

export default SimpleButton;
