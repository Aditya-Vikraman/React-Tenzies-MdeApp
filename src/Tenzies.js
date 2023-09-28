import React from 'react';

import Die from './components/Tenzies-Die'
import './style/Tenzies.css';
import Confetti from 'react-confetti';

export default function TenziesApp () {
  const [dice, setDice] = React.useState(allNewDice());

  const [tenzies, setTenzies] = React.useState(false);

  const [rolls, setRolls] = React.useState(()  => 0)

  React.useEffect(() => {
    const allHeld = dice.every(item => item.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(item => item.value === firstValue)
    // every method executes a function for each array element and return true if function return true for each element. or returns false if function returns false for one element.

    // let allHeld;
    // let allSameValue;
    // for (let i = 0; i < dice.length; i++) {
    //   if (dice[i].isHeld===false) {
    //     allHeld = false
    //     break
    //   } else {
    //     allHeld = true
    //   }
    //   if (dice[i].value !== firstValue) {
    //     allSameValue = false
    //     break
    //   } else {
    //     allSameValue = true
    //   }
    // }
    // above you cannot use forEach loop because the loop cannot be broken with return statement. in case of for loop as soon as isHeld value is false the allHeld is set to false and the loop breaks.

    // let allHeld = dice.every ((item) => {
    //   if(!item.isHeld) {
    //     return false 
    //   } else {
    //    return true
    //   }
    // })
    // let allSameValue = dice.every ((item) => {
    //   if(item.value !== firstValue) {
    //     return false
    //   } else {
    //     return true
    //   }
    // })
    
    if (allHeld && allSameValue) {
      setTenzies(true)
    }  
  }, [dice])

  function allNewDice () {
    // const array = [1,2,3,4,5,6,7,8,9,0];
    // const newArray = array.map((item) => {
    //   const num = Math.floor(Math.random()*60/6)
    //   if (num < 7) {
    //     return num
    //   }
    // })
    const diceArray = [];
    for (let i = 0; i < 10;  i++) {
      diceArray.push({
        value: Math.ceil(Math.random()*6),
        isHeld: false, 
        id: (i +1),
      })
    }
    return diceArray
  }

  function rollDice () {
    if (!tenzies) {
      setDice (prevDice =>  prevDice.map((item,index) => {
        return item.isHeld ? 
          item : 
          { value: Math.ceil(Math.random()*6),
          isHeld: false, 
          id: (index +1),}
      }))
      setRolls(prevRoll=> (prevRoll + 1))
    } else {
      setDice(allNewDice())
      setTenzies(false)
      setRolls(0)
    }
  }

  function holdDice (id) {
    setDice (prevDice => {
     return prevDice.map((item) => {
      return item.id === id ? 
      {...item, isHeld: !item.isHeld} :
      item
     })
      
    })
  }

  const diceElements = dice.map((item) => {
    return ( 
    <Die 
      key={item.id} 
      value={item.value} 
      isHeld={item.isHeld}
      handleClick={holdDice}
      id={item.id}
    />
    )
  })

  return (
    <main>
      <div className="text-container">
        <h1>Tenzies App</h1>
        <p>Roll untill all dice are the same. Click each die to freeze it at its current value between rools.</p>
      </div>
      <div><b>Number of Rolls: {rolls}</b></div>
      <div className="die-container">
       {diceElements}
      </div>
      <button className="roll-button" onClick={rollDice}>{
        tenzies ? "New Game" : "Roll"
      }</button>
      {tenzies && <Confetti />}
    </main>
  )
}

