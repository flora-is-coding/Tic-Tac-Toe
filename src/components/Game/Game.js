import { useEffect, useRef, useState } from 'react';
import './Game.css';

import { Tile } from '../Tile/Tile';

const defaultTiles = [
    null, null, null,
    null, null, null,
    null, null, null,
];

export function Game(props) {
    const { round, onWinner } = props;

    const [tiles, setTiles] = useState([ ...defaultTiles ])
    const [counter, setCounter] = useState(0);
    const [winner, setWinner] = useState(null);

    const prevRound = useRef();
    useEffect(() => {
        if ( prevRound.current !== round ) {
            setTiles([ ...defaultTiles ]);
            setWinner(null);
            setCounter(0);
            prevRound.current = round;
        }
    }, [props.round]);

    function handleClick (index) {
        if (winner !== null) return;
        if (tiles[index] !== null) return;

        tiles[index] = counter % 2;
        setTiles(tiles);
        setCounter(counter+1);
        const result = calculateWinner(tiles)
        const isFinished = tiles.every(function(e) {
            return e !== null
        });

        console.log(result)
        if(result !== null){
            setWinner(result);
            onWinner(result);
        }

        if(isFinished === true){
            setWinner("draw")
            onWinner('draw')
        }
        console.log(isFinished)
    }

    function calculateWinner (tiles) {
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
    
        for(let i = 0; i < lines.length; i++){
            const a = lines[i][0]
            const b = lines[i][1]
            const c = lines[i][2]
            if(tiles[a] !== null && tiles[a] === tiles[b] && tiles[b] === tiles[c]){
                return tiles[a]
            } 
        }
        return null
    }

    return (
        <div className={props.className + " game"}>
            { tiles.map((tileValue, index) => (
                <Tile 
                    className="game__tile" 
                    onClick={() => handleClick(index)} 
                    value={tileValue} 
                    key={index}

                />
                )
            )}
            
        </div>
    )
}
