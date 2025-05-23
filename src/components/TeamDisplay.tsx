import React from 'react';
import { Team, Player } from '../types';
import { RefreshCw, Users } from 'lucide-react';

interface TeamDisplayProps {
  teams: Team[];
  remainingPlayers: Player[];
  onReshuffle: () => void;
  onReset: () => void;
}

const TeamDisplay: React.FC<TeamDisplayProps> = ({ teams, remainingPlayers, onReshuffle, onReset }) => {
  const teamColors = {
  'bg-blue-500': 'bg-blue-100 border-blue-300',
  'bg-green-500': 'bg-green-100 border-green-300',
  'bg-orange-500': 'bg-orange-100 border-orange-300',
  'bg-red-500': 'bg-red-100 border-red-300',
  'bg-purple-500': 'bg-purple-100 border-purple-300',
  'bg-yellow-500': 'bg-yellow-100 border-yellow-300',
  'bg-pink-500': 'bg-pink-100 border-pink-300',
  'bg-teal-500': 'bg-teal-100 border-teal-300',
};
// 

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Times Formados</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {teams.map((team) => (
          <div 
            key={team.id}
            className="rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <div className={`${team.color} p-4`}>
              <h3 className="text-xl font-bold text-white">{team.name}</h3>
            </div>
            <ul className={`${teamColors[team.color as keyof typeof teamColors]} p-4 space-y-2 border-t-0 min-h-[240px]`}>
              {team.players.map((player, index) => (
                <li 
                  key={index}
                  className="p-3 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md"
                >
                  {player}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {remainingPlayers.length > 0 && (
        <div className="mb-8">
          <div className="bg-gray-100 rounded-xl shadow-md overflow-hidden">
            <div className="bg-gray-700 p-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Users size={24} className="mr-2" />
                Jogadores Restantes
              </h3>
            </div>
            <ul className="p-4 space-y-2">
              {remainingPlayers.map((player, index) => (
                <li 
                  key={index}
                  className="p-3 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md"
                >
                  {player}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
        {/*<button
          onClick={onReshuffle}
          disabled
          className="flex items-center justify-center py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          <RefreshCw className="mr-2" size={20} />
          Redistribuir times
        </button>
        */} 
        <button
          onClick={onReset}
          className="py-2 px-6 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-200"
        >
          Novos Jogadores
        </button>
      </div>
    </div>
  );
};

export default TeamDisplay;