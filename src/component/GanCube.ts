import {connectGanCube, GanCubeConnection} from "gan-web-bluetooth";
import {useState} from "react";

export const GanCube = () => {
    const [moves, setMoves] = useState<string[]>([]);
    const [connected, setConnected] = useState<boolean>(false);

    const connect = async () => {
        const conn: GanCubeConnection = await connectGanCube();
        conn.events$.subscribe((event) => {
            switch (event.type) {
                case "FACELETS":
                    if (!connected) setConnected(true);
                    break;

                case "MOVE":
                    moveEvent(event.move);
                    break;

                case "DISCONNECT":
                    setConnected(false);
            }
        });
    };

    const moveEvent = (move: string): void => {
        setMoves(allMoves => {
            const lastTwo: string[] = combineTwoMoves(allMoves[allMoves.length - 1], move);
            return allMoves.slice(0, -1).concat(lastTwo);
        })
    };

    const resetMoves = (): void => {
        setMoves([]);
    }

    return { connect, connected, moves, resetMoves };
}

export const combineTwoMoves = (firstMove: string, secondMove: string): string[] => {
    if ((firstMove??[''])[0] == (secondMove??[''])[0]) {
        if (firstMove == secondMove)
            return firstMove.length == 2 && firstMove[1] == '2' ? [firstMove[0]] : [firstMove[0] + '2'];
        else if (firstMove[1] == '2')
            return [inverse(secondMove)];
        else if (secondMove[1] == '2')
            return [inverse(firstMove)]
        else
            return [];
    } else {
        return firstMove === undefined ? [secondMove] : [firstMove, secondMove];
    }
}

export const inverse = (move: string): string => {
    if (move === undefined || move == '')
        return '';
    else if (move.length == 2)
        return move[1] == '2' ? move : move[0];
    else
        return move + "'";
}