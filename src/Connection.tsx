import {GanCube} from "./component/GanCube.ts";
import {Timer} from "./component/Timer.ts";
import {useEffect, useState} from "react";

interface props {
    value: string;
    scramble: (currentMoves: string[]) => string;
    solved: () => void;
}

function Connection(props: props) {
    const { connect, moves, connected, resetMoves, isSolved} = GanCube();
    const {getTime, toggleTimer, resetTimer} = Timer();
    const [isScrambled, setIsScrambled] = useState<boolean>(false);

    const scramble:string = isScrambled ? '' : props.scramble(moves);

    useEffect(() => {
        if (scramble == '' && !isScrambled) {
            setIsScrambled(true);
            resetMoves();
        }
        if (moves.length == 1 && isScrambled) {
            toggleTimer(true);
            resetTimer();
        }

        if (isSolved && isScrambled) {
            toggleTimer(false);
            resetMoves();
            setIsScrambled(false);
            props.solved();
        }
    }, [scramble, moves, isSolved]);

    return (
        <>
            <h4>{(scramble != '' || !isScrambled) && ('Scramble: '+scramble) } </h4>
            <h1>{getTime()}</h1>
            {!connected && <button onClick={connect}> {props.value} </button>}
        </>
    )
}

export default Connection;