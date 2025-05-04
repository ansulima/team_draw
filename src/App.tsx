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

  const handlePlayersSubmit = (newPlayers: Player[]) => {
    setPlayers(newPlayers);
    const result = createTeams(newPlayers);
    setTeams(result.teams);
    setRemainingPlayers(result.remainingPlayers);
    setIsTeamsGenerated(true);
  };

  const handleReshuffle = () => {
    const result = createTeams(players);
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {!isTeamsGenerated ? (
            <div className="my-8 animate-fadeIn">
              <PlayerInput onPlayersSubmit={handlePlayersSubmit} />
            </div>
          ) : (
            <div className="my-8 animate-fadeIn">
              <TeamDisplay 
                teams={teams} 
                remainingPlayers={remainingPlayers}
                onReshuffle={handleReshuffle} 
                onReset={handleReset} 
              />
            </div>
          )}
        </div>
      </main>
      
      <footer className="py-6 bg-gray-800 text-center text-gray-300">
        <p>Sorteador de Times &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App