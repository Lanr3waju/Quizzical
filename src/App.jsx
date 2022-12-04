import './App.css';
import React from 'react';
import WelcomePage from './components/WelcomePage';
import TestPage from './components/TestPage';

function App() {
  const [difficulty, setDifficulty] = React.useState('');
  const [welcomeScreen, setWelcomeScreen] = React.useState(true);

  function handleDifficultyLevel({ target: { value } }) {
    setDifficulty(value);
  }

  function handleScreenRender() {
    setWelcomeScreen((prevState) => !prevState);
  }

  return (
    <main>
      {welcomeScreen ? (
        <WelcomePage
          handleDifficultyLevel={(event) => handleDifficultyLevel(event)}
          levelOfDifficulty={difficulty}
          handleScreenRender={() => handleScreenRender()}
        />
      ) : <TestPage />}
    </main>
  );
}

export default App;
