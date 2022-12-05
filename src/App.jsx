import './App.css';
import React from 'react';
import { nanoid } from 'nanoid';
import WelcomePage from './components/WelcomePage';
import TestPage from './components/TestPage';

function App() {
  const [dropDownVal, setDropDownVal] = React.useState({
    difficulty: '',
    noOfQuestions: '',
  });

  const [welcomeScreen, setWelcomeScreen] = React.useState(true);
  const [fetchedQuestions, setFetchedQuestions] = React.useState([]);

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
    const res = await fetch(`https://opentdb.com/api.php?amount=${noOfQuestions || 5}&difficulty=${difficulty}&type=multiple`);
    const data = await res.json();
    setFetchedQuestions(data.results);
  }

  console.log(fetchedQuestions);

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
        <TestPage
          questions={fetchedQuestions}
          key={nanoid()}
        />
      )}
    </main>
  );
}

export default App;
