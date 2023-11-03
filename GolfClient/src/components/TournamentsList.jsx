import { useEffect, useState } from "react";
import { getAllTournaments } from "../api/tournaments.api";
import { TournamentCard } from "./TournamentCard";

export function TournamentsList() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    async function loadTournaments() {
      const res = await getAllTournaments();
      setTournaments(res.data);
    }
    loadTournaments();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      {tournaments.map((tournament) => (
        <TournamentCard key={tournament.id} tournament={tournament} />
      ))}
    </div>
  );
}
