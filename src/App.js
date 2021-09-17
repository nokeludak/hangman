import React, { useState, useEffect } from 'react';
import './App.css';
import Figure from "./components/Figure"
import Header from "./components/Header"
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Notification from "./components/Notification";
import Popup from './components/Popup';
import { showNotification as show } from './components/helpers/helpers';
import axios from "axios";





function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedWords, setSelectedWords] = useState("");

  const getWords = () => {
    axios.get('https://random-word-api.herokuapp.com//word?number=1')
    .then(response => setSelectedWords(response.data.toString()))
    }

    useEffect(() => {
      getWords()
    }, [])


  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWords.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    getWords();
    
    
    
  }

  return (
    <div className="App">
      <Header />
      <div className="game-container">
      <Figure wrongLetters={wrongLetters}/>
      <WrongLetters wrongLetters={wrongLetters}/>
      <Word selectedWords={selectedWords} correctLetters={correctLetters}/>
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} 
      selectedWords={selectedWords} setPlayable={setPlayable} playAgain={playAgain}/>
      <Notification showNotification={showNotification}/>
      
      
    </div>
  );
}

export default App;
