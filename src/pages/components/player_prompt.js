import { useState } from "react";
import Button from "./button_with_text";

// Component that allows users to enter a unique identifier (name, nickname, etc.) for the purposes of the game
// Max. 10 characters, will not allow blanks
const PlayerPrompt = ({nav, setPlayers}) => {

    const [P1, setP1] = useState('');
    const [P2, setP2] = useState('');
    const [P3, setP3] = useState('');

    const onClick = () => {
        if (!P1 || !P2 || !P3){
            alert("Please enter a value for each of the three players");
            return;
        }

        if (P1.toLowerCase() === P2.toLowerCase() || P1.toLowerCase() === P3.toLowerCase() || P2.toLowerCase() === P3.toLowerCase() ){
            alert("Please enter a unique name for each player");
            return;
        }

        setPlayers([P1, P2, P3]);

        nav();
    };

    return(
        <div id="player_prompt" className="center">
            <label htmlFor="p1" className="player_label">Player 1:</label>
            <input className="player_label" type="text" value={P1} id="p1" name="p1" maxLength={10} onChange={(e) => setP1(e.target.value)}></input>
            <br></br>

            <label htmlFor="p2" className="player_label">Player 2:</label>
            <input className="player_label" type="text" value={P2} id="p2" name="p2" maxLength={10} onChange={(e) => setP2(e.target.value)}></input>
            <br></br>

            <label htmlFor="p3" className="player_label">Player 3:</label>
            <input className="player_label" type="text" value={P3} id="p3" name="p3" maxLength={10} onChange={(e) => setP3(e.target.value)}></input>
            <br></br>

            <Button text="Play!" onClick={onClick}/>
        </div>
    )
}

export default PlayerPrompt;