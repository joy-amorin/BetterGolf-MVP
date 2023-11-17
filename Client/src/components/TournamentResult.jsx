
import { useEffect, useState } from "react";
import {getRankingByIdTournament} from "../api/tournamentranking.api";


export default function TournamentResult( id) {
  const [values, setValues] = useState([]);

  const  fetchRanking = async () => {
    const response = await getRankingByIdTournament(id);
    const ranking = response.data;
    setValues(ranking);
  
  }

  useEffect(() => {
    fetchRanking();
  }, []);


  return (
    <div>

    {values.map((value) => (  
      <p key={value.id}> {value.position} </p> 
      ))
    }
    </div>
  

  );
}