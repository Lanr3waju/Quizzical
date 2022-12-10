/* eslint-disable camelcase */
import { decode } from 'html-entities';
import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import QuestionCard from './QuestionCard';

export default function TestPage({ questions }) {
  const el = questions.map(({ question, correct_answer, incorrect_answers }) => (
    <QuestionCard
      question={decode(question)}
      key={nanoid()}
      rightAnswer={correct_answer}
      wrongAnswers={incorrect_answers}
    />
  ));

  return (
    <section className="test-page">
      {el}
      <button type="button"> Submit Answers </button>
    </section>
  );
}

TestPage.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape(PropTypes.string.isRequired).isRequired,
  ).isRequired,
};
