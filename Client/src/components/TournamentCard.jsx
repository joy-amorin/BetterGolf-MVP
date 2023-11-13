
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
    <Card className="  transition ease-in-out delay-150 bg-gradient-to-r from-blue-500 to-blue-600 hover:-translate-y-1 hover:scale-110  duration-300 ... ml-4 mt-4 ">
        <div onClick={() => navigate(`/tournaments/${tournament.id}`)}>
        <CardHeader >
            <p className=" w-1/2 text-xs sm:text-lg text-start "> {tournament.tournamentType}</p>
            <p className=" w-1/2 text-xs sm:text-lg text-end  ">Inicio:  {tournament.startDate}</p>
        </CardHeader>
    </div>
        <Divider /> 
        <CardBody >
            <p className=" text-xs sm:text-lg text-center">{tournament.name}</p>
	    <p>Players: {tournament.playerCount}</p>
        </CardBody>
        <CardFooter >
          {/* <div className="w-1/2">
            <p onClick={ async () => {navigate(`/tournaments/${tournament.id}/players`)}}> Ver Jugadores</p>
            </div> */}
       
            <p onClick={ async () => { navigate(`/tournaments/${tournament.id}/addplayers`);}} className="w-1/2 text-start">Agregar Jugadores</p>
            
          
            <p className="text-md text-end w-1/2"> Fin: { tournament.endDate} </p>
            
            </CardFooter>
      </Card>
  );
}