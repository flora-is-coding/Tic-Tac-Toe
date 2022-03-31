import './Home.css';

import {Game} from '../../components/Game/Game';
import { useEffect, useState, useRef } from 'react';

export function Home (props) {

    const [winner, setWinner] = useState(null);
    const [winnerArray, setWinnerArray] = useState([]);
    const [round, setRound] = useState(1);


    function handleWinner (w) {
        setWinner(w)
        setWinnerArray([...winnerArray, w])
        console.log(winner, winnerArray)
    }

    console.log(winnerArray)

    function handleReset() {
        setWinner(null)
        setRound(1)
        setWinnerArray([])
    }

    function handleRound () {
        setRound(round +1)
    }

    function x (value) {
        if(value === 0) {
            return "o"
        } else if(value === 1) {
            return "x"
        }
        return "draw"
    } 
    return (
        <div className="home">
            <div className='home__round'>Round: {round}</div>
            <Game 
                className="home__game"  
                round={round}
                onWinner={handleWinner}
            />
            <div className='home__result'>Winner: {x(winner)}</div>
            <div className='home__buttons button'>
                <button className='button_start-new' onClick={handleRound} >Start new</button>
                <button className='button__reset button' onClick={handleReset} >Reset</button>
            </div>
            <ul className='home__list'>
                {winnerArray !== null &&
                <ListItem x={x} winner={winner} winnerArray={winnerArray}/>}
            </ul>
        </div>
    )
}

function ListItem (props) {
    const winnerArray = props.winnerArray;
    const winner = props.winner
    return (
        <div className='list'>
            { winnerArray.map((winner, index) => (<li key={index} className='list-item'>Winner: {props.x(winner)}</li>))}
        </div>
        
    )
}