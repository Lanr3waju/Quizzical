import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export default function QuestionCard({ question, wrongAnswers, rightAnswer }) {
  return (
    <section className="question">
      <h3>{question}</h3>
      <ul>
        {wrongAnswers.map((wrongAnswer) => <li key={nanoid()}>{wrongAnswer}</li>)}
        <li>{rightAnswer}</li>
      </ul>
      <div className="hr" />
    </section>
  );
}

QuestionCard.propTypes = {
  question: PropTypes.string.isRequired,
  rightAnswer: PropTypes.string.isRequired,
  wrongAnswers: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.string.isRequired,
      end: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};
