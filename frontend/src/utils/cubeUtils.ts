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

export const solve = async (moves: string) => {
    const response = await fetch('http://127.0.0.1:5000/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ facelet: moves , solved: solvedState })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.text(); // Parse JSON response
}

export const possibleMoves: string[] = [
    'U', 'D', 'B', 'F', 'L', 'R',
    'U\'', 'D\'', 'B\'', 'F\'', 'L\'', 'R\'',
    'U2', 'D2', 'B2', 'F2', 'L2', 'R2'
];

export const solvedState = 'UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB';
