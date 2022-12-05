/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import QuestionCard from './QuestionCard';

export default function TestPage({ questions }) {
  return (
    <section className="test-page">
      {questions.map(({
        question, incorrect_answers, correct_answer,
      }) => (
        <QuestionCard
          question={question}
          wrongAnswers={incorrect_answers}
          rightAnswer={correct_answer}
          key={nanoid()}
        />
      ))}
    </section>
  );
}

TestPage.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
