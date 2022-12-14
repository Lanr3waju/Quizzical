/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';

export default function QuestionCard({
  question, answersState, chooseAnswer, selectedAnswers,
}) {
  const answersEl = answersState.map((answer) => {
    const selectedAns = selectedAnswers.find(
      (selectedAnswer) => selectedAnswer.question === question.q,
    );
    if (selectedAns) console.log(selectedAns);
    return <li id={question.q} className={`${selectedAns} && selected`} key={nanoid()} onClick={(event) => chooseAnswer(event)} aria-hidden="true">{answer.value}</li>;
  });

  return (
    <section className="question">
      <h3>{decode(question.q)}</h3>
      <ul>
        {answersEl}
      </ul>
      <div className="hr" />
    </section>
  );
}

QuestionCard.propTypes = {
  // question: PropTypes.string.isRequired,
  // rightAnswer: PropTypes.string.isRequired,
  // wrongAnswers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
