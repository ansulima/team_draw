import React, { useState } from 'react';
import { Player, Team } from './types';
import { createTeams } from './utils/teamUtils';
import PlayerInput from './components/PlayerInput';
import TeamDisplay from './components/TeamDisplay';
import Header from './components/Header';

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [remainingPlayers, setRemainingPlayers] = useState<Player[]>([]);
  const [isTeamsGenerated, setIsTeamsGenerated] = useState(false);
  const [playersPerTeam, setPlayersPerTeam] = useState(4);
  const [loading, setLoading] = useState(false); // Novo estado

  const handlePlayersSubmit = (newPlayers: Player[], newPlayersPerTeam: number) => {
    setPlayers(newPlayers);
    setPlayersPerTeam(newPlayersPerTeam);
    setLoading(true); // Ativa o loading
    setTimeout(() => {
      const result = createTeams(newPlayers, newPlayersPerTeam);
      setTeams(result.teams);
      setRemainingPlayers(result.remainingPlayers);
      setIsTeamsGenerated(true);
      setLoading(false); // Desativa o loading
    }, 2000);
  };

  const handleReshuffle = () => {
    const result = createTeams(players, playersPerTeam);
    setTeams(result.teams);
    setRemainingPlayers(result.remainingPlayers);
  };

  const handleReset = () => {
    setPlayers([]);
    setTeams([]);
    setRemainingPlayers([]);
    setIsTeamsGenerated(false);
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col"
      style={{
        backgroundImage: "url('https://altipisos.com.br/wp-content/uploads/2021/04/site-1.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[600px]">
              <div className="text-6xl font-extrabold text-gray-800 flex items-center animate-bounce animate-infinite animate-duration-1000 animate-delay-500 animate-ease-linear">
                Carregando times...
              </div>
            </div>
          ) : !isTeamsGenerated ? (
            <PlayerInput onPlayersSubmit={handlePlayersSubmit} />
          ) : (
            <TeamDisplay 
              teams={teams} 
              remainingPlayers={remainingPlayers}
              onReshuffle={handleReshuffle} 
              onReset={handleReset} 
            />
          )}
        </div>
      </main>
      
      <footer className="py-6 bg-gray-800 text-center text-gray-300">
        <p>Sorteador de Time &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;