import React from 'react';
import PropTypes from 'prop-types';

export default function WelcomePage({
  handleDropDownValues,
  noOfQuestions,
  levelOfDifficulty,
  handleScreenRender,
  fetchQuestions,
}) {
  function renderPageWithQuestions() {
    fetchQuestions();
    handleScreenRender();
  }

  return (
    <form className="welcome-page">
      <h1>Quizzical</h1>
      <p>Select difficulty of questions</p>
      <select
        id="difficulty"
        value={levelOfDifficulty}
        onChange={handleDropDownValues}
        name="difficulty"
      >
        <option value>-Select Difficulty-</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <select
        id="noOfQuestions"
        value={noOfQuestions}
        onChange={handleDropDownValues}
        name="noOfQuestions"
      >
        <option value>-Select No of questions-</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
      <button onClick={renderPageWithQuestions} type="button">Start quiz</button>
    </form>
  );
}

WelcomePage.propTypes = {
  handleDropDownValues: PropTypes.func.isRequired,
  handleScreenRender: PropTypes.func.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  levelOfDifficulty: PropTypes.string.isRequired,
  noOfQuestions: PropTypes.string.isRequired,
};
