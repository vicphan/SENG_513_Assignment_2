import Popup from 'reactjs-popup';
import ButtonWithIcon from './button_with_icon';

// Pop up that appears at the end of the game
// Will display game results and replay button for users to replay the game
const PopUp = ({ open_window, close_window, restart_game, player_names, score }) => {

    const calculateWinner = (score) => {
        const allEqual = (score[0] === score[1] && score[1] === score[2]);
        let winner_string = "";
        if (allEqual) {
            winner_string = "Game over! It's a tie!";
        }
        else {
            const [one, two, three] = score;
            if (one === two && one > three) {
                winner_string = "Game over! " + player_names[0] +" & " + player_names[1] + " are tied!";
            }
            else if (two === three && two > one) {
                winner_string = "Game over! " + player_names[1] +" & " + player_names[2] + " are tied!";
            }
            else if (one === three && one > two) {
                winner_string = "Game over! " + player_names[0] +" & " + player_names[2] + " are tied!";
            }
            else {
                let winner = score.indexOf(Math.max(...score)) + 1;
                winner_string = "Game over! " + player_names[winner-1] + " wins!";
            }
        }
        return winner_string;
    }

    return (
        <Popup open={open_window} modal>
            <button className="close" onClick={() => close_window()}>
                &times;
            </button>
            <div className='modal'>
                <p className='info_text'><b>{calculateWinner(score)}</b></p>
                <p className='info_text'><em>Final result:</em></p>
                <p className='info_text'>{player_names[0]}: {score[0]}</p>
                <p className='info_text'>{player_names[1]}: {score[1]}</p>
                <p className='info_text'>{player_names[2]}: {score[2]}</p>
                <ButtonWithIcon type="replay" onClick={() => restart_game()}/>
            </div>
        </Popup>
    )
}

export default PopUp;

