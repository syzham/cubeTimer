import {connectGanCube, GanCubeConnection} from "gan-web-bluetooth";
import {useState} from "react";

export const GanCube = () => {
    const [moves, setMoves] = useState<string[]>([]);

    const connect = async () => {
        const conn: GanCubeConnection = await connectGanCube();
        conn.events$.subscribe((event) => {
            if (event.type == "FACELETS") {
                //console.log("Cube facelets state", event.facelets);
            } else if (event.type == "MOVE") {
                moveEvent(event.move);
            }
        });
    };

    const moveEvent = (move: string): void => {
        setMoves(allMoves => {
            const lastTwo: string[] = combineTwoMoves(allMoves[allMoves.length - 1], move);
            return allMoves.slice(0, -1).concat(lastTwo);
        })
    };



    return { connect, moves };
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
    if (move.length == 2)
        return move[1] == '2' ? move : move[0];
    else
        return move + "'";
}