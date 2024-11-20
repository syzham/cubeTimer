import {connectGanCube, GanCubeConnection} from "gan-web-bluetooth";
import {useState} from "react";
import {combineTwoMoves} from "../utils/cubeUtils.ts";

export const useGanCube = () => {
    const [moves, setMoves] = useState<string[]>([]);
    const [connected, setConnected] = useState<boolean>(false);
    const [isSolved, setIsSolved] = useState<boolean>(false);
    const solvedState = 'UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB';

    const connect = async () => {
        const conn: GanCubeConnection = await connectGanCube();
        conn.events$.subscribe((event) => {
            switch (event.type) {
                case "FACELETS":
                    if (!connected) setConnected(true);
                    setIsSolved(event.facelets == solvedState);
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

    return { connect, connected, moves, resetMoves, isSolved };
}

