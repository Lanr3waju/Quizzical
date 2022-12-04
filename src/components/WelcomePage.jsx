import React from 'react';
import PropTypes from 'prop-types';

export default function WelcomePage({
  handleDifficultyLevel, levelOfDifficulty, handleScreenRender,
}) {
  return (
    <section className="welcome-page">
      <h1>Quizzical</h1>
      <p>Select difficulty of questions</p>
      <select
        id="question"
        value={levelOfDifficulty}
        onChange={handleDifficultyLevel}
        name="question"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button onClick={handleScreenRender} type="button">Start quiz</button>
    </section>
  );
}

WelcomePage.propTypes = {
  handleDifficultyLevel: PropTypes.func.isRequired,
  handleScreenRender: PropTypes.func.isRequired,
  levelOfDifficulty: PropTypes.string.isRequired,
};
