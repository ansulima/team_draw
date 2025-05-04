import React, { useState } from 'react';
import { Player } from '../types';
import { parsePlayerString, validatePlayerCount } from '../utils/teamUtils';
import { AlertCircle, Plus, Minus } from 'lucide-react';

interface PlayerInputProps {
  onPlayersSubmit: (players: Player[]) => void;
}

const PlayerInput: React.FC<PlayerInputProps> = ({ onPlayersSubmit }) => {
  const [inputMethod, setInputMethod] = useState<'individual' | 'batch'>('individual');
  const [individualPlayers, setIndividualPlayers] = useState<string[]>([]);
  const [batchInput, setBatchInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addPlayerField = () => {
    setIndividualPlayers([...individualPlayers, '']);
  };

  const removePlayerField = (index: number) => {
    const newPlayers = individualPlayers.filter((_, i) => i !== index);
    setIndividualPlayers(newPlayers);
  };

  const handleIndividualPlayerChange = (index: number, value: string) => {
    const newPlayers = [...individualPlayers];
    newPlayers[index] = value;
    setIndividualPlayers(newPlayers);
    setError(null);
  };

  const handleBatchInputChange = (value: string) => {
    setBatchInput(value);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let players: Player[] = [];
    
    if (inputMethod === 'individual') {
      players = individualPlayers.map(p => p.trim()).filter(p => p !== '');
    } else {
      players = parsePlayerString(batchInput);
    }
    
    if (!validatePlayerCount(players)) {
      setError('Você precisa fornecer pelo menos 8 jogadores (2 times completos)');
      return;
    }
    
    onPlayersSubmit(players);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Insira os nomes dos jogadores</h2>
      
      <div className="flex mb-6 space-x-4">
        <button
          type="button"
          onClick={() => setInputMethod('individual')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            inputMethod === 'individual'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Individual
        </button>
        <button
          type="button"
          onClick={() => setInputMethod('batch')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            inputMethod === 'batch'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Lista (separados por vírgula ou linha)
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {inputMethod === 'individual' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {individualPlayers.map((player, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="flex-grow">
                    <label htmlFor={`player-${index}`} className="block text-sm font-medium text-gray-700">
                      Jogador {index + 1}
                    </label>
                    <input
                      type="text"
                      id={`player-${index}`}
                      value={player}
                      onChange={(e) => handleIndividualPlayerChange(index, e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Nome do jogador ${index + 1}`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removePlayerField(index)}
                    className="mt-6 p-2 text-red-600 hover:text-red-800 focus:outline-none"
                  >
                    <Minus size={20} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addPlayerField}
              className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus size={20} className="mr-2" />
              Adicionar Jogador
            </button>
          </div>
        ) : (
          <div>
            <label htmlFor="batch-input" className="block text-sm font-medium text-gray-700">
              Nomes dos jogadores (separados por vírgula ou linha)
            </label>
            <textarea
              id="batch-input"
              value={batchInput}
              onChange={(e) => handleBatchInputChange(e.target.value)}
              rows={6}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="João, Maria, Pedro, Ana..."
            />
            <p className="mt-2 text-sm text-gray-500">
              Digite os nomes dos jogadores (mínimo 8 jogadores para formar 2 times completos)
            </p>
          </div>
        )}
        
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