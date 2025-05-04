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
export const createTeams = (players: Player[]): TeamResult => {
  const shuffledPlayers = shuffleArray(players);
  const playersPerTeam = 4;
  const teams: Team[] = [];
  
  // Calculate how many complete teams we can form
  const numberOfCompleteTeams = Math.floor(shuffledPlayers.length / playersPerTeam);
  
  // Create complete teams
  for (let i = 0; i < numberOfCompleteTeams && i < 3; i++) {
    const startIndex = i * playersPerTeam;
    teams.push({
      id: i + 1,
      name: `Time ${i + 1}`,
      color: getTeamColor(i),
      players: shuffledPlayers.slice(startIndex, startIndex + playersPerTeam)
    });
  }

  // Get remaining players
  const assignedPlayers = teams.length * playersPerTeam;
  const remainingPlayers = shuffledPlayers.slice(assignedPlayers);
  
  return { teams, remainingPlayers };
};

/**
 * Gets the color for a team based on its index
 */
const getTeamColor = (index: number): string => {
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-orange-500'];
  return colors[index] || colors[0];
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