/* eslint-disable camelcase */
import { decode } from 'html-entities';
import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import QuestionCard from './QuestionCard';

export default function TestPage({ questions }) {
  const answers = () => questions.map(({
    incorrect_answers, correct_answer,
  }) => {
    let answersArr = [];
    const rightAnswerObj = { value: correct_answer, id: nanoid() };
    answersArr = incorrect_answers.map((wrongAnswer) => (
      { value: wrongAnswer, id: nanoid() }
    ));
    answersArr.push(rightAnswerObj);
    return answersArr;
  });

  const [answersState] = React.useState(answers());
  const [anz, setAnz] = React.useState([{ q: '', a: '', id: '' }]);

  // console.log(answersState);

  function chooseAnswer({ target }) {
    questions.forEach(({ question }) => {
      const selAns = answersState.find((ans) => ans.id === target.id);
      setAnz((prevAns) => {
        if (selAns) { return [...[], { q: question, a: selAns.value, id: selAns.id }]; }
        return prevAns;
      });
    });
  }

  const el = questions.map(({ question }) => (
    <QuestionCard
      question={decode(question)}
      key={nanoid()}
      anz={anz}
      answersState={answersState}
      chooseAnswer={(event) => chooseAnswer(event)}
    />
  ));

  // console.log(answersState);

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
