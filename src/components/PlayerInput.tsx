import React, { useState } from 'react';
import { Player } from '../types';
import { parsePlayerString, validatePlayerCount } from '../utils/teamUtils';
import { AlertCircle } from 'lucide-react';

interface PlayerInputProps {
  onPlayersSubmit: (players: Player[], playersPerTeam: number) => void;
}

const PlayerInput: React.FC<PlayerInputProps> = ({ onPlayersSubmit }) => {
  const [batchInput, setBatchInput] = useState('');
  const [playersPerTeam, setPlayersPerTeam] = useState(4);
  const [error, setError] = useState<string | null>(null);

  const handleBatchInputChange = (value: string) => {
    setBatchInput(value);
    setError(null);
  };

  const handlePlayersPerTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayersPerTeam(Number(e.target.value));
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const players = parsePlayerString(batchInput);
    if (!validatePlayerCount(players, playersPerTeam)) {
      setError(`Você precisa fornecer pelo menos ${playersPerTeam * 2} jogadores (2 times completos)`);
      return;
    }
    onPlayersSubmit(players, playersPerTeam);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Insira os nomes dos jogadores</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="batch-input" className="block text-sm font-medium text-gray-700">
            Nomes dos jogadores (separados por vírgula)
          </label>
          <textarea
            id="batch-input"
            value={batchInput}
            onChange={(e) => handleBatchInputChange(e.target.value)}
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="João, Maria, Pedro, Ana..."
          />
          <p className="mt-2 text-sm text-gray-500">
            Digite os nomes dos jogadores separados por vírgula (mínimo {playersPerTeam * 2} jogadores para formar 2 times completos)
          </p>
        </div>
        <div>
          <label htmlFor="players-per-team" className="block text-sm font-medium text-gray-700">
            Jogadores por time
          </label>
          <input
            id="players-per-team"
            type="number"
            min={2}
            max={11}
            value={playersPerTeam}
            onChange={handlePlayersPerTeamChange}
            className="mt-1 block w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {error && (
          <div className="flex items-center p-4 text-red-800 border-l-4 border-red-500 bg-red-50">
            <AlertCircle size={20} className="mr-2" />
            <span>{error}</span>
          </div>
        )}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Formar Times
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlayerInput;