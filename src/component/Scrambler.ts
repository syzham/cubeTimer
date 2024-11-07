import {useState} from "react";
import {inverse, combineTwoMoves} from "./GanCube.ts";

export const Scrambler = () => {
    const possibleMoves: string[] = [
        'U', 'D', 'B', 'F', 'L', 'R',
        'U\'', 'D\'', 'B\'', 'F\'', 'L\'', 'R\'',
        'U2', 'D2', 'B2', 'F2', 'L2', 'R2'
    ];
    const length = 2;

    const [ currScramble, setCurrScramble ] = useState<string[]>([]);

    const scramble = (): void => {
        setCurrScramble([]);
        let face: number = 0;
        const scram: string[] = []
        while (scram.length < length) {
            face = Math.floor(Math.random() * (possibleMoves.length));
            if (scram.length > 0 && possibleMoves[face][0] == scram[scram.length - 1][0]) continue;
            scram.push(possibleMoves[face]);
        }
        setCurrScramble(scram);
    };

    const getDisplayScramble = (currentMoves: string[]): string => {
        let redo: string = '';
        let i = 0;
        let anyMistakes: boolean = false;

        for (i; i < currentMoves.length; i++) {
            if (currentMoves[i] != currScramble[i]) {anyMistakes = true; break;}
        }
        for (let j = currentMoves.length -1; j >= i; j--) {
            if (!anyMistakes) continue;
            if (j == currentMoves.length - 1) redo += combineTwoMoves(inverse(currentMoves[j]), currScramble[i]).join(' ') + ' ';
            else redo += inverse(currentMoves[j]) + ' ';
        }
        redo = (redo == '') ? currScramble[i] + ' ': redo;

        if (!anyMistakes && currentMoves.length == currScramble.length) return '';

        return redo + (currScramble.slice(i+1).join(' '));
    }

    return { scramble, getDisplayScramble };
}
