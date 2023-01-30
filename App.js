import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [yahtzee, setYahtzee] = React.useState(false)
    const [count, setCount] = React.useState(0)
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setYahtzee(true)
        }
    }, [dice])

    

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 6; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        setCount(count+1)
        if (count<3){
        if(!yahtzee) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setYahtzee(false)
            setDice(allNewDice())
        }
    }
    else{
        setYahtzee(false)
            setDice(allNewDice())
            setCount(count-3)
    }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }

    function newGame(){
        setYahtzee(false)
            setDice(allNewDice())
            setCount(count-count)
    }
    
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {yahtzee && <Confetti />}
            <h1 className="title">Yahtzee</h1>
            <p className="instructions"> 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            {count<3 &&
            <button 
                className="roll-dice" 
                onClick={rollDice}
                
                
            >
                {count<3 ? `Roll(${count+1})` : `New Rolls`}
            </button>
            }
            <button
            className="roll-dice"
            onClick={newGame}>
                Restart
            </button>
        </main>
    )
}