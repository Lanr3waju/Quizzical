import React from 'react';
import PropTypes from 'prop-types';
import { decode } from 'html-entities';
import classNames from 'classnames';

export default function QuestionCard({
  question, answersState, chooseAnswer, selectedAnswers, correctAnswer, submitted,
}) {
  const answersEl = answersState.map((answer) => {
    const selectedAns = selectedAnswers.find(
      (selectedAnswer) => selectedAnswer.question === question
      && selectedAnswer.selected_answer === answer,
    );
    return (
      <li
        id={question}
        className={classNames(
          {
            selected: selectedAns,
            correct: submitted && answer === correctAnswer,
            wrong: submitted && selectedAns !== undefined && answer !== correctAnswer,
          },
        )}
        key={answer}
        onClick={(event) => chooseAnswer(event)}
        aria-hidden="true"
      >
        {decode(answer)}
      </li>
    );
  });

  return (
    <section className="question">
      <h3>{decode(question)}</h3>
      <ul>
        {answersEl}
      </ul>
      <div className="hr" />
    </section>
  );
}

QuestionCard.propTypes = {
  question: PropTypes.string.isRequired,
  submitted: PropTypes.bool.isRequired,
  chooseAnswer: PropTypes.func.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  answersState: PropTypes.arrayOf(
    PropTypes.shape(PropTypes.string.isRequired).isRequired,
  ).isRequired,
  selectedAnswers: PropTypes.arrayOf(
    PropTypes.shape(PropTypes.object.isRequired).isRequired,
  ).isRequired,
};
