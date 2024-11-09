import './App.css'
import Connection from './Connection'
import {Scrambler} from "./component/Scrambler.ts";
import {useEffect} from "react";

function App() {
    const {scramble, getDisplayScramble} = Scrambler();

    useEffect(() => {scramble()}, []);

    return (
    <>
        <div className="card">
            <Connection value={"Connect Cube"} scramble={getDisplayScramble} />
        </div>
        <script type={"module"} src={"Connection.tsx"}></script>
    </>
    )
}

export default App
