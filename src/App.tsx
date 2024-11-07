import './App.css'
import Connection from './Connection'
import {Scrambler} from "./component/Scrambler.ts";

function App() {
    const {scramble, getDisplayScramble} = Scrambler();

  return (
    <>
        <div className="card">
            <Connection value={"Connect Cube"} scramble={getDisplayScramble} />
        </div>
        <button onClick={scramble}> Scramble </button>
        <script type={"module"} src={"Connection.tsx"}></script>
    </>
  )
}

export default App
