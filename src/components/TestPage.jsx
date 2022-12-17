import React from 'react';
import PropTypes from 'prop-types';
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
            key={question}
            submitted={submitted}
            answersState={allOptions}
            selectedAnswers={selectedAnswers}
            chooseAnswer={(e) => chooseAnswer(e)}
            correctAnswer={correctAnswer}
          />
        );
      })}
      <button className="submit" disabled={selectedAnswers.length !== questionsState.length} type="button" onClick={handleSubmit}>
        {submitted ? 'Play Again' : 'Submit'}
      </button>
      {submitted && <p className="notice">{`You scored ${score} / ${questionsState.length} correct answers`}</p>}
    </section>
  );
}

TestPage.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape(PropTypes.string.isRequired).isRequired,
  ).isRequired,
  fetchQuestions: PropTypes.func.isRequired,
};
