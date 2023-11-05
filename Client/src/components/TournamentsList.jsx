import { useEffect, useState } from "react";
import { getAllTournaments } from "../api/tournaments.api";
import { TournamentCard } from "./TournamentCard";

export function TournamentsList({ refetch }) {
  const [tournaments, setTournaments] = useState([]);

  const fetchTournaments = async () => {
    const response = await getAllTournaments();
    setTournaments(response.data);
  };

  useEffect(() => {
    fetchTournaments();
  }, [refetch]);

  return (
    <div className="grid grid-cols-3 gap-3">
      {tournaments.map((tournament) => (
        <TournamentCard key={tournament.id} tournament={tournament} />
      ))}
    </div>
  );
}
