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

export const inverseMoves = (moves: string[]): string[] => {
    const newMoves: string[] = [];
    for (let i = moves.length; i >= 0 ; i--) {
        newMoves.push(inverse(moves[i]));
    }
    return newMoves;
}

export const solve = async (moves: string): Promise<string> => {
    const response = await fetch('http://127.0.0.1:5000/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ facelet: moves , solved: solvedState })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.text();
}

export const availableCorners = (color1:string, color2:string, color3:string, used:number[] = []):[[string, string, string], number[]] => {
    const possibleCorners: string[][] =
        [
            ['U', 'L', 'B'],
            ['U', 'B', 'R'],
            ['U', 'F', 'L'],
            ['U', 'R', 'F'],
            ['R', 'D', 'F'],
            ['R', 'B', 'D'],
            ['F', 'D', 'L'],
            ['D', 'B', 'L']
        ]

    let randomCorner:number = Math.floor(Math.random()*possibleCorners.length);
    while (used.includes(randomCorner)) {
        randomCorner = Math.floor(Math.random()*possibleCorners.length);
    }
    const randomRotation:number = Math.floor(Math.random()*3);

    used.push(randomCorner);
    return [[
        possibleCorners[randomCorner][randomRotation],
        possibleCorners[randomCorner][(1 + randomRotation)%3],
        possibleCorners[randomCorner][(2 + randomRotation)%3]], used];
}

export const availableEdges = (color1:string, color2:string, used:number[] = []):[[string, string], number[]] => {
    const possibleEdges: string[][] =
        [
            ['U', 'B'],
            ['U', 'L'],
            ['U', 'R'],
            ['U', 'F'],
            ['R', 'F'],
            ['R', 'B'],
            ['R', 'D'],
            ['F', 'L'],
            ['F', 'D'],
            ['D', 'L'],
            ['D', 'B'],
            ['L', 'B']
        ]
    let randomEdge:number = Math.floor(Math.random()*possibleEdges.length);
    while (used.includes(randomEdge)) {
        randomEdge = Math.floor(Math.random()*possibleEdges.length);
    }
    const randomRotation:number = Math.floor(Math.random()*2);

    used.push(randomEdge);
    return [[
        possibleEdges[randomEdge][randomRotation],
        possibleEdges[randomEdge][(1 - randomRotation)]], used];
}

export const validateCorners = (facelet:string): boolean => {
    const clockwise:number[] = [9, 17, 18, 26, 36, 44, 45, 53];
    const counterClockwise:number[] = [11, 15, 20, 24, 38, 42, 47, 51];
    let cornerPermutation:number = 0;
    const UD:number[] = [...facelet.matchAll(/[UD]/g)].map(match => match.index);
    cornerPermutation += UD.filter(value => clockwise.includes(value)).length;
    cornerPermutation += UD.filter(value => (counterClockwise.includes(value))).length * 2;
    return cornerPermutation%3 == 0;
}

export const validateEdges = (facelet:string): boolean => {
    const rightEdges:(0|1)[] = [0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1];
    let edgePermutation:number = 0;
    for (let i = 0; i < edges.length; i++) {
        if (facelet[edges[i][rightEdges[i]]] == 'U' || facelet[edges[i][rightEdges[i]]] == 'D') edgePermutation++;
        else if (facelet[edges[i][1 - rightEdges[i]]] == 'L' || facelet[edges[i][1 - rightEdges[i]]] == 'R') edgePermutation++;
    }
    return edgePermutation%2 == 0;
}

export const solvedState = 'UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB';

export const corners: number[][] =
    [
        [0, 36, 47],
        [2, 11, 45],
        [6, 18, 38],
        [8, 9, 20],
        [15, 26, 29],
        [17, 35, 51],
        [24, 27, 44],
        [33, 42, 53]
    ]

export const edges: number[][] =
    [
        [1, 46],
        [3, 37],
        [5, 10],
        [7, 19],
        [12, 23],
        [14, 48],
        [16, 32],
        [21, 41],
        [25, 28],
        [30, 43],
        [34, 52],
        [39, 50]
    ]