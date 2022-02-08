import {React, useEffect, useState, useRef } from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function App() {

  // global counter
  const counter = useRef(0);

  //create state
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  // win the game effect
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const allSameValue = dice.every(die => die.value === dice[0].value);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice])

  // generate new dice
  function newDice () {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  // generate dice array
  function allNewDice () {
    const randomArray = [];
    for (let i = 0; i < 10; i++) {
      randomArray.push(newDice())
    } 
    return randomArray;
  }

  // change isHeld value
  function holdDice (id) {
    setDice(prevDice => prevDice.map(die => {
       return die.id === id ? {...die, isHeld: !die.isHeld} : die 
    }))
  }
  
  // handle click event
  function rollDice () {
    if (!tenzies) {
      counter.current = counter.current + 1;
      setDice(prevDice => prevDice.map(die => {
      return !die.isHeld ? newDice() : die
      }))
    } else {
      setTenzies(false);
      setDice(allNewDice());
      counter.current = 0;
    }
  }

  // create dice elements to render
  const diceElements = dice.map(die => (
    <Die 
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld} 
      holdDice={()=> holdDice(die.id)} 
    />
  ))

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p>Tirá hasta que todas las caras sean iguales. Presioná cada dado para congelarlo entre cada ronda.</p>
      <div className='dice--container'>
        {diceElements}
      </div>
      <div className='game--info'>
        <p className='bold'>Cantidad de tiros: <span>{counter.current}</span></p>
      </div>
      <button className='roll--button' onClick={rollDice}>
        {!tenzies ? "Tirá" : "Nueva partida"}
      </button>
    </main>
  )
}
