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