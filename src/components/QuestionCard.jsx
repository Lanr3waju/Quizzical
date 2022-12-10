/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export default function QuestionCard({
  question, wrongAnswers, rightAnswer,
}) {
  const answers = () => {
    const rightAnswerObj = { value: rightAnswer, isSelected: false, id: nanoid() };
    const answersArr = wrongAnswers.map((wrongAnswer) => (
      { value: wrongAnswer, id: nanoid() }
    ));
    answersArr.push(rightAnswerObj);
    return answersArr.sort(() => Math.random() - 0.5);
  };

  const [answersState] = React.useState(answers());

  const [anz, setAnz] = React.useState([{ q: question, a: '', id: '' }]);

  function chooseAnswer({ target }) {
    const selAns = answersState.find((ans) => ans.id === target.id);
    setAnz((prevAns) => {
      if (selAns) { return [...[], { q: question, a: selAns.value, id: selAns.id }]; }

      return prevAns;
    });
  }

  const answersEl = answersState.map((answer) => <li className={anz[0].id === answer.id ? 'selected' : ''} id={answer.id} key={nanoid()} onClick={(event) => chooseAnswer(event)} aria-hidden="true">{answer.value}</li>);

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
  rightAnswer: PropTypes.string.isRequired,
  wrongAnswers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
