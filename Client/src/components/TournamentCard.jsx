
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
} from "@nextui-org/react";

export function TournamentCard({ tournament }) {
  const navigate = useNavigate();
  return (
    <Card>
        <div onClick={() => navigate(`/tournaments/${tournament.id}`)}>
        <CardHeader className=" bg-green-400 text-gray-800">
            <p className="text-md">{tournament.name} Inicio:  {tournament.startDate}</p>
        </CardHeader>
    </div>
        <Divider />
        <CardBody>
            <p>{tournament.tournamentType}</p>
	    <p>Players: {tournament.playerCount}</p>
        </CardBody>
        <CardFooter className="bg-green-400 text-gray-800">
          {/* <div className="w-1/2">
            <p onClick={ async () => {navigate(`/tournaments/${tournament.id}/players`)}}> Ver Jugadores</p>
            </div> */}
          <div className="w-1/2">
            <p onClick={ async () => { navigate(`/tournaments/${tournament.id}/addplayers`);}}>Agregar Jugadores</p>
            </div>
          <div className="w-1/2">
            <p> Fin: { tournament.endDate} </p>
            </div>
            </CardFooter>
      </Card>
  );
}