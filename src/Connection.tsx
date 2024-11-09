import {GanCube} from "./component/GanCube.ts";

interface props {
    value: string;
    scramble: (currentMoves: string[]) => string;
}

function Connection(props: props) {
    const { connect, moves, connected } = GanCube();

    const scramble = props.scramble(moves);
    return (
        <>
            <h4>{scramble != '' && ('Scramble: '+scramble) } </h4>
            <p>curr Move: {moves[moves.length - 1]}</p>
            <p>prev Move: {moves.join(' ')}</p> <br/>
            {!connected && <button onClick={connect}> {props.value} </button>}
        </>
    )
}

export default Connection;