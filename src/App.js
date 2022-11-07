import {Routes, Route, useNavigate} from 'react-router-dom';
import './App.css';
import LandingPage from './pages/landing';
import MainPage from './pages/main';
import { useState } from "react";


function App() {
  // player names
  const [players, set_players] = useState(["Player 1", "Player 2", "Player 3"]);

  const setPlayers = (players) => {
    set_players(players);
  }

  const navigate = useNavigate();

  const navigateToMain = () => {
    navigate('/main');
  }

  const navigateToLanding = () => {
    navigate('/');
  }

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<LandingPage nav={navigateToMain} setPlayers={setPlayers}/>}/>
        <Route exact path="/main" element={<MainPage players={players} nav={navigateToLanding} />}/>
      </Routes>
    </div>
  )
}

export default App;
