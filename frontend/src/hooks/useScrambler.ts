import {useState} from "react";
import * as cube from "../utils/cubeUtils.ts";

export const useScrambler = () => {

    const [ currScramble, setCurrScramble ] = useState<string[]>([]);

    const scramble = (): void => {
        const newFacelet:string = generateFacelet();
        cube.solve(newFacelet)
            .then(data => {setCurrScramble(cube.inverseMoves(data.split(' ')))})
            .catch(() => {setCurrScramble([])});
    };

    const getDisplayScramble = (currentMoves: string[]): string => {
        if (currScramble.length == 0) return '-';
        let redo: string = '';
        let i:number = 0;
        let anyMistakes: boolean = false;

        for (i; i < currentMoves.length; i++) {
            if (currentMoves[i] != currScramble[i]) {anyMistakes = true; break;}
        }
        for (let j:number = currentMoves.length -1; j >= i; j--) {
            if (!anyMistakes) continue;
            if (j == currentMoves.length - 1) redo += cube.combineTwoMoves(cube.inverse(currentMoves[j]), currScramble[i]).join(' ') + ' ';
            else redo += cube.inverse(currentMoves[j]) + ' ';
        }
        redo = (redo == '') ? currScramble[i] + ' ': redo;

        if (!anyMistakes && currentMoves.length == currScramble.length) return '';

        return redo + (currScramble.slice(i+1).join(' '));
    }

    const generateFacelet = (base:string = 'XXXXUXXXXXXXXRXXXXXXXXFXXXXXXXXDXXXXXXXXLXXXXXXXXBXXXX'): string => {
        let newFacelet:string = base;
        let used:number[] = [];
        const clockWise:boolean[] = [true, false, true, true, false, false, true, false];
        let i:number = 0;
        for (const corner of cube.corners) {
            let faces: [string, string, string];
            [faces, used] = cube.availableCorners(base[corner[0]], base[corner[1]], base[corner[2]], used);
            newFacelet =
                newFacelet.substring(0, corner[0]) + faces[0] +
                newFacelet.substring(corner[0]+1, corner[1]) + faces[clockWise[i] ? 1 : 2] +
                newFacelet.substring(corner[1]+1, corner[2]) + faces[clockWise[i++] ? 2 : 1] +
                newFacelet.substring(corner[2]+1);
        }
        while (!cube.validateCorners(newFacelet)) {
            const corner:number[] = cube.corners[Math.floor(Math.random() * (cube.corners.length))];
            newFacelet =
                newFacelet.substring(0, corner[0]) + newFacelet[corner[1]] +
                newFacelet.substring(corner[0]+1, corner[1]) + newFacelet[corner[2]] +
                newFacelet.substring(corner[1]+1, corner[2]) + newFacelet[corner[0]] +
                newFacelet.substring(corner[2]+1);
        }
        used = [];
        for (const edge of cube.edges) {
            let faces: [string, string];
            [faces, used] = cube.availableEdges(base[edge[0]], base[edge[1]], used);
            newFacelet =
                newFacelet.substring(0, edge[0]) + faces[0] +
                newFacelet.substring(edge[0]+1, edge[1]) + faces[1] +
                newFacelet.substring(edge[1]+1);
        }
        if (!cube.validateEdges(newFacelet)) {
            const edge:number[] = cube.edges[Math.floor(Math.random() * (cube.edges.length))];
            newFacelet =
                newFacelet.substring(0, edge[0]) + newFacelet[edge[1]] +
                newFacelet.substring(edge[0]+1, edge[1]) + newFacelet[edge[0]] +
                newFacelet.substring(edge[1]+1);
        }
        return newFacelet;
    }

    return { scramble, getDisplayScramble };
}
