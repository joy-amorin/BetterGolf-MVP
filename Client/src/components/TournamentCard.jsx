
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
    <div className="align-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-md ml-26 ">

    <Card className="w-full mx-auto transition ease-in-out delay-150  dark:bg-zinc-800 hover:-translate-y-1 hover:scale-110  duration-300 hover:rounded-none ... ml-4 mt-4  flex-1  shadow-sm shadow-slate-400  ">
        <div onClick={() => navigate(`/tournaments/${tournament.id}`)}>
        <CardHeader className="flex justify-between items-center bg-sky-300 dark:bg-zinc-700">
            <p className=" w-full sm:w-auto text-xs sm:text-lg  text-center sm:text-start not-italic font-bold-x-3 text-black dark:text-slate-200 text-bold "> {tournament.name}</p>
          

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
        <CardFooter className="flex justify-between items-center bg-neutral-100 dark:bg-zinc-800">
       
            <p className="w-1/2 text-start  text-xs sm:text-md  text-slate-500 "> Inicio:  {tournament.startDate} </p>
            
          
            <p className="text-md text-end w-1/2  text-xs sm:text-md  text-slate-500 "> Fin: { tournament.endDate}  </p>
            
            </CardFooter>
    </div>
      </Card>
    </div>
  );
}