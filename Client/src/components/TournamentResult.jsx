
import { useEffect, useState } from "react";
import {getRankingByIdTournament} from "../api/tournamentranking.api";


export function TournamentResult( { prueba }) {
  const [values, setValues] = useState([]);
  console.log(prueba)
  const  fetchRanking = async () => {
    const response = await getRankingByIdTournament(prueba);
    console.log(response.data);
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