
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
} from "@nextui-org/react";

export function TournamentCard({ tournament, finished }) {
  const navigate = useNavigate();
  return (
    <div className=" w-1/5 ml-26 ">

    <Card className=" transition ease-in-out delay-150  dark:bg-zinc-800 hover:-translate-y-1 hover:scale-110  duration-300 hover:rounded-none ... ml-4 mt-4  flex-1  shadow-sm shadow-slate-400 ">
        <div onClick={() => navigate(`/tournaments/${tournament.id}`)}>
        <CardHeader className=" bg-sky-300 dark:bg-zinc-700">
            <p className=" w-3/4 text-xs sm:text-lg text-start not-italic font-bold-x-3 text-black text-bold "> {tournament.name}</p>
          

            <p className=" w-1/4 text-xs sm:text-md text-end text-slate-500 " > {tournament.tournamentType} Players: {tournament.playerCount}</p>        
           
        </CardHeader>
        <Divider /> 
        <CardBody className="bg-neutral-100 text-neutral-800 dark:bg-zinc-800">
          {!finished &&

            <p className=" text-xs sm:text-md text-center text-neutral-900  line-clamp-3" > {tournament.description}</p>
 
 
}
{finished &&
         <p className="text-gray-400 text-center"> Tournament finished, click me to view the result</p>
          }
         
        </CardBody>
        <CardFooter className=" bg-neutral-100 dark:bg-zinc-800">
       
            <p className="w-1/2 text-start  text-xs sm:text-md  text-slate-500 "> Inicio:  {tournament.startDate} </p>
            
          
            <p className="text-md text-end w-1/2  text-xs sm:text-md  text-slate-500 "> Fin: { tournament.endDate}  </p>
            
            </CardFooter>
    </div>
      </Card>
    </div>
  );
}