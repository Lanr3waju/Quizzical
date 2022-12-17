import './App.css';
import React, { useState } from 'react';
import { shuffle } from 'lodash';
import WelcomePage from './components/WelcomePage';
import TestPage from './components/TestPage';

function App() {
  const [dropDownVal, setDropDownVal] = useState({
    difficulty: '',
    noOfQuestions: '',
  });

  const [welcomeScreen, setWelcomeScreen] = useState(true);
  const [fetchedQuestions, setFetchedQuestions] = useState([]);

  function handleDropDownValues({ target: { value, name } }) {
    setDropDownVal((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleScreenRender() {
    setWelcomeScreen((prevState) => !prevState);
  }

  async function fetchQuestions() {
    const { difficulty, noOfQuestions } = dropDownVal;
    fetch(
      `https://opentdb.com/api.php?amount=${noOfQuestions || 5
      }&difficulty=${difficulty}&type=multiple`,
    ).then((data) => data.json()).then((data) => {
      const dataResults = [...data.results];
      const fetchedData = dataResults.map((result) => {
        const fetchResult = result;
        fetchResult.user_selection = null;
        fetchResult.all_options = shuffle([...result.incorrect_answers, result.correct_answer]);
        return result;
      });
      setFetchedQuestions(fetchedData);
    });
  }

  const testEl = fetchedQuestions.length > 0 ? (
    <TestPage
      questions={fetchedQuestions}
      fetchQuestions={() => fetchQuestions()}
    />
  ) : <p className="notice">Please wait, questions are loading...</p>;

  return (
    <main>
      {welcomeScreen ? (
        <WelcomePage
          handleDropDownValues={(event) => handleDropDownValues(event)}
          levelOfDifficulty={dropDownVal.difficulty}
          noOfQuestions={dropDownVal.noOfQuestions}
          handleScreenRender={() => handleScreenRender()}
          fetchQuestions={() => fetchQuestions()}
        />
      ) : (
        testEl
      )}
    </main>
  );
}

export default App;
