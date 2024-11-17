import './App.css'
import './css/GridItems.css'
import Connection from './Connection'
import {Scrambler} from "./component/Scrambler.ts";
import {useEffect, useState} from "react";

function App() {
    const numberOFSolvers = 1;
    const {scramble, getDisplayScramble} = Scrambler();
    const [solvedConnection, setSolvedConnection] = useState<boolean[]>(Array(numberOFSolvers).fill(false));

    useEffect(() => {if (solvedConnection.every(status => status || !status)) scramble()}, [solvedConnection]);

    const handleSolvedConnection = (index: number) => {
        setSolvedConnection(prevStatus => {
            const newStatus = [...prevStatus];
            newStatus[index] = true;
            return newStatus;
        });
    };

    return (
        <>
            <div className={`grid-container layout-${numberOFSolvers}`}>
                {Array.from({length: numberOFSolvers}, (_, index) => (
                    <div className={'grid-item'}><Connection key={index} value={"Connect Cube"} scramble={getDisplayScramble}
                                     solved={() => handleSolvedConnection(index)}/></div>
                    ))}
            </div>
            <script type={"module"} src={"Connection.tsx"}></script>
        </>
    )
    }

export default App
