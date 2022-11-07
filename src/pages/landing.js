import Header from './components/header';
import PlayerPrompt from './components/player_prompt';

// Landing page where players can enter their identifiers and start the game
const LandingPage = ({nav, setPlayers}) => {

    return(
        <div className='page'>
            <Header id="header_landing" />
            <PlayerPrompt nav={nav} setPlayers={setPlayers}/>
        </div>
    )
}

export default LandingPage;