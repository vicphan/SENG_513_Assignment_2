import Header from "./components/header";
import Game from "./components/game";

// Main page that includes the game board
const MainPage = ({players, nav}) => {

    return (
        <div className="page">
            <Header id="header_main" />
            <Game players={players} nav={nav}/>
        </div>
    )
}

export default MainPage;