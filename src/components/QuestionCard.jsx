/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { decode } from 'html-entities';
import { nanoid } from 'nanoid';

export default function QuestionCard({
  question, answersState, anz, chooseAnswer,
}) {
  console.log(answersState);

  const answersEl = answersState.map((el) => el.forEach((answer) => <li className={anz[0].id === answer.id ? 'selected' : ''} id={answer.id} key={nanoid()} onClick={chooseAnswer} aria-hidden="true">{decode(answer.value)}</li>));

  // answersEl();

  // const answersEl = answersState.array.forEach((element) => {
  //   element.map((answer) => <li className={anz[0].id === answer.id ? 'selected' : ''} id={answer.id} key={nanoid()} onClick={chooseAnswer} aria-hidden="true">{decode(answer.value)}</li>);
  // });

  return (
    <section className="question">
      <h3>{question}</h3>
      <ul>
        {answersEl}
      </ul>
      <div className="hr" />
    </section>
  );
}

QuestionCard.propTypes = {
  question: PropTypes.string.isRequired,
};
