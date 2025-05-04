export type Player = string;

export type Team = {
  id: number;
  name: string;
  color: string;
  players: Player[];
};

export type TeamResult = {
  teams: Team[];
  remainingPlayers: Player[];
};