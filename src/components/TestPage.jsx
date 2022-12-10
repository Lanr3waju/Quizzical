/* eslint-disable camelcase */
import { decode } from 'html-entities';
import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import QuestionCard from './QuestionCard';

export default function TestPage({ questions }) {
  // const answers = () => {
  //   let answersArr = [];
  //   questions.map(({ incorrect_answers, correct_answer }) => {
  //     const rightAnswerObj = { value: correct_answer, isSelected: false, id: nanoid() };
  //     // console.log(rightAnswerObj);
  //     answersArr = incorrect_answers.map((wrongAnswer) => (
  //       { value: wrongAnswer, isSelected: false, id: nanoid() }
  //     ));
  //     answersArr.push(rightAnswerObj);
  //     console.log(answersArr.sort(() => Math.random() - 0.5));
  //     return answersArr;
  //   });
  //   return answersArr;
  // };

  // // console.log(answers());

  // const [answersState] = React.useState(answers());

  // const [anz, setAnz] = React.useState([]);

  // function chooseAnswer({ target }) {
  //   const questionz = [];
  //   const selAns = answersState.find((ans) => ans.id === target.id);
  //   setAnz(selAns ? [...questions, { q: questionz, a: selAns.value, id: selAns.id }] :
  //  questions);
  // }

  return (
    <section className="test-page">
      {questions.map(({
        question, incorrect_answers, correct_answer,
      }) => (
        <QuestionCard
          question={decode(question)}
          wrongAnswers={incorrect_answers}
          rightAnswer={correct_answer}
          key={nanoid()}
          // answersState={answersState}
          // chooseAnswer={() => chooseAnswer()}
          // anz={anz}
        />
      ))}
    </section>
  );
}

TestPage.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape(PropTypes.string.isRequired).isRequired,
  ).isRequired,
};
