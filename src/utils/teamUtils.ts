import { Player, Team, TeamResult } from '../types';

/**
 * Shuffles an array using the Fisher-Yates algorithm
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Creates teams with exactly 4 players each and returns remaining players
 */
export const createTeams = (players: Player[], playersPerTeam: number): TeamResult => {
  const shuffledPlayers = shuffleArray(players);
  const teams: Team[] = [];
  const numberOfCompleteTeams = Math.floor(shuffledPlayers.length / playersPerTeam);

  for (let i = 0; i < numberOfCompleteTeams; i++) {
    const startIndex = i * playersPerTeam;
    teams.push({
      id: i + 1,
      name: `Time ${i + 1}`,
      color: getTeamColor(i),
      players: shuffledPlayers.slice(startIndex, startIndex + playersPerTeam)
    });
  }

  const assignedPlayers = teams.length * playersPerTeam;
  const remainingPlayers = shuffledPlayers.slice(assignedPlayers);

  return { teams, remainingPlayers };
};

/**
 * Gets the color for a team based on its index
 */
const getTeamColor = (index: number): string => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-yellow-500',
    'bg-pink-500',
    'bg-teal-500'
  ];
  return colors[index % colors.length];
};

/**
 * Parses a string of comma or line separated player names
 */
export const parsePlayerString = (playerString: string): Player[] => {
  return playerString
    .split(/[,\n]/)
    .map(name => name.trim())
    .filter(name => name !== '');
};

/**
 * Validates if there are enough players to form at least two complete teams
 */
export const validatePlayerCount = (players: Player[]): boolean => {
  const nonEmptyPlayers = players.filter(player => player.trim() !== '');
  return nonEmptyPlayers.length >= 8; // Minimum 8 players (2 complete teams)
};