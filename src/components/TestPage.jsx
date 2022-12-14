/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import QuestionCard from './QuestionCard';

export default function TestPage({ questions }) {
  const [questionsJamo, setQuestionsJamo] = React.useState([]);
  const [selectedAnswers, setSelectedAnswers] = React.useState([]);
  // const [answersState] = React.useState(answers());

  const questionCardEl = () => questionsJamo.map((
    { question, correct_answer, incorrect_answers },
  ) => {
    const q = { q: question, id: nanoid() };

    // return (
    // <QuestionCard
    //   question={q}
    //   key={nanoid()}
    //   answersState={answersState}
    //   chooseAnswer={(event) => chooseAnswer(event)}
    // />
    // );
  });

  // const answers = () => {
  //   const rightAnswerObj = { value: correct_answer, id: nanoid() };
  //   let answersArr = incorrect_answers.map((wrongAnswer) => (
  //     { value: wrongAnswer, id: nanoid() }
  //   ));
  //   answersArr = [...answersArr, rightAnswerObj];
  //   return answersArr.sort(() => Math.random() - 0.5);
  // };

  function chooseAnswer({ target }) {
    const answerz = [...selectedAnswers];
    const otherAns = answerz.filter((answer) => answer.question !== target.id);
    const newAnswers = [
      ...otherAns,
      {
        question: target.id,
        selected_answer: target.textContent,
      },
    ];
    setSelectedAnswers([...newAnswers]);
  }

  function handleSubmit() {
    // console.log(`0 / ${que.length}`);
  }

  React.useEffect(() => {
    if (questions.length > 0) { setQuestionsJamo(questions); }
  }, [questions]);

  return (
    <section className="test-page">
      {questionsJamo.length > 0 && questionsJamo.map((
        { question, correct_answer, incorrect_answers },
      ) => {
        const q = { q: question, id: nanoid() };

        const answers = () => {
          const rightAnswerObj = { value: correct_answer, id: nanoid() };
          let answersArr = incorrect_answers.map((wrongAnswer) => (
            { value: wrongAnswer, id: nanoid() }
          ));
          answersArr = [...answersArr, rightAnswerObj];
          return answersArr.sort(() => Math.random() - 0.5);
        };

        return (
          <QuestionCard
            question={q}
            key={nanoid()}
            answersState={answers()}
            selectedAnswers={selectedAnswers}
            chooseAnswer={(event) => chooseAnswer(event)}
          />
        );
      })}
      <button type="button" onClick={handleSubmit}> Submit Answers </button>
    </section>
  );
}

TestPage.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape(PropTypes.string.isRequired).isRequired,
  ).isRequired,
};
