import React from 'react';

export default function StartScreen({ numQuestions, dispatch }) {
  return (
    <>
      <div className="start">
        <h2>Welcome to the React Quiz</h2>
        <p>{numQuestions} quest to your react mastery</p>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: 'start' })}
        >
          Lets Start
        </button>
      </div>
    </>
  );
}
