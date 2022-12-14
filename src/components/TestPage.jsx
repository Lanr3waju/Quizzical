import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import QuestionCard from './QuestionCard';

export default function TestPage({ questions, fetchQuestions }) {
  const [questionsState, setQuestionsState] = React.useState([]);
  const [selectedAnswers, setSelectedAnswers] = React.useState([]);
  const [submitted, setSubmitted] = React.useState(false);
  function chooseAnswer({ target }) {
    const choice = [...selectedAnswers];
    const otherAns = choice.filter((answer) => answer.question !== target.id);
    const newAnswers = [
      ...otherAns,
      {
        question: target.id,
        selected_answer: target.textContent,
      },
    ];
    setSelectedAnswers([...newAnswers]);
  }

  let score = 0;

  function handleSubmit() {
    setSubmitted(!submitted);
    if (submitted) {
      fetchQuestions();
    }
  }

  React.useEffect(() => {
    if (questions.length > 0) { setQuestionsState(questions); }
  }, [questions]);

  return (
    <section className="test-page">
      {questionsState.length > 0 && questionsState.map((
        {
          question, correct_answer: correctAnswer, all_options: allOptions,
        },
      ) => {
        selectedAnswers.forEach((el) => {
          if (el.selected_answer === correctAnswer) {
            score += 1;
          }
        });

        return (
          <QuestionCard
            question={question}
            key={nanoid()}
            submitted={submitted}
            answersState={allOptions}
            selectedAnswers={selectedAnswers}
            chooseAnswer={(event) => chooseAnswer(event)}
            correctAnswer={correctAnswer}
          />
        );
      })}
      {selectedAnswers.length === questionsState.length ? (
        <button className="submit" type="button" onClick={handleSubmit}>
          {' '}
          {submitted ? 'Play Again' : 'Submit'}
          {' '}
        </button>
      )
        : (
          <button className="submit" disabled type="button" onClick={handleSubmit}>
            {' '}
            {submitted ? 'Play Again' : 'Submit'}
            {' '}
          </button>
        ) }
      {submitted && <p>{`You score ${score} / ${questionsState.length}`}</p>}
    </section>
  );
}

TestPage.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape(PropTypes.string.isRequired).isRequired,
  ).isRequired,
  fetchQuestions: PropTypes.func.isRequired,
};
