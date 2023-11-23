import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTournamentById,
  getAllPlayersInTournament,
  deleteTournament,
} from "../api/tournaments.api";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { TournamentsFormPage } from "./TournamentsFormPage";
import { toast } from "react-hot-toast";
import { TournamentandPLayer } from "./TournamentAndPlayer";
import { TournamentResult } from "../components/TournamentResult";
export function TournamentPage() {
  const [tournament, setTournament] = useState(null);
  const [numOfPlayers, setNumOfPlayers] = useState(null);
  const { id } = useParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  const params = useParams();
  const [size, setSize] = React.useState("md");
  const [backdrop, setBackdrop] = React.useState("opaque");
  const currentDate = new Date();
  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };
  const handleBackdropChange = (newBackdrop) => {
    setBackdrop(newBackdrop);
  };
  const [refetch, setRefetch] = React.useState(true);
  
  const handleRefetch = () => {
    setRefetch((prevRefetch) => !prevRefetch);
  };
  useEffect(() => {
    async function fetchTournament() {
      try {
        const response = await getTournamentById(id);
        setTournament(response.data);
      } catch (error) {
        console.error("Error fetching tournament:", error);
      }
    }
    async function fetchNumOfPlayers() {
      try {
        const response = await getAllPlayersInTournament(id);
        setNumOfPlayers(response.data.length);
      } catch (error) {
        console.error("Error fetching number of players:", error);
      }
    }
    fetchTournament();
    fetchNumOfPlayers();
  }, [id, refetch]);
  
  return (
    <>
      <div className="w-3/4 ml-32">
        <div>

        <div className="flex items-start justify-start w-1/3">

    <Button 
    variant="shadow"
    color="default"
    onClick={() => navigate("categories")} className="bg-amber-950">Tournament-Categories</Button>
    </div>
    <div className=" flex justify-end items-start"> 
    <Button
      variant="shadow"
      color="success"
      onClick={async () => {navigate(`/tournaments`)}} 
      className="bg-teal-500 hover:bg-teal-400 text-white font-bold py-3 px-6 rounded w-1/6 transition transform active:shake  " >
         Go Back
         </Button>
         </div>
        </div>
        {tournament ? (
          <div>
            <Card className="bg-zinc-800 dark:bg-zinc-900 mt-7">
           
              <CardHeader className="bg-zinc-700">
                <h1 className="text-3xl font-bold">{tournament.name}</h1>
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="mb-3 text-gray-700 dark:text-gray-500 text-tiny uppercase font-bold text-end">
                  {new Date(tournament.startDate).toLocaleDateString()} -{" "}
                  {new Date(tournament.endDate).toLocaleDateString()}
                </p>
                <p className="mb-3 text-gray-700 dark:text-gray-500 text-tiny uppercase font-bold">
                  {tournament.tournamentType}
                </p>

<div>
    {(new Date(tournament.endDate) < currentDate) ? (
      <div>
      <p className="text-gray-400 text-center"> Tournament finished</p>
      <TournamentResult prueba={params.id} />
      <p className="text-gray-400 text-center"> {tournament.description}</p>
     </div>
    ) : (
      <p className=" text-xs sm:text-md text-center  text-slate-400 line-clamp-3" >
        {tournament.description}
      </p>
    )}
  </div>

              </CardBody>
              <CardFooter className="flex justify-between">
                <Button onPress={() => handleOpen("")} className="bg-purple-600 text-white border border-purple-600 shadow-md hover:bg-purple-800 hover:border-purple-400">
                  Edit info
                  <Modal
                    size={"2xl"}
                    backdrop={"blur"}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    isDismissable={false}
                  >
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                          <ModalBody>
                            <TournamentsFormPage
                              onClose={onClose}
                              setRefetch={handleRefetch}
                            />
                          </ModalBody>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </Button>
                <Button
                  color="danger"
                  onClick={async () => {
                    const accepted = window.confirm(
                      "Are you sure you want to delete this tournament?"
                    );
                    if (accepted) {
                      await deleteTournament(params.id);
                  
                      toast.success("Tournament deleted");
                      navigate("/tournaments");
                    }
                  }}
                >
                  Delete tournament
                </Button>
              </CardFooter>
                  
            </Card>
            <Divider className="my-3" />
            <Card  className="bg-zinc-800 dark:bg-zinc-900 mt-7">
              <CardHeader className="bg-zinc-700">
                <h1 className="text-3xl font-bold">
                  {numOfPlayers === 0
                    ? `No players on ${tournament.name}`
                    : `${numOfPlayers} Player${
                        numOfPlayers === 1 ? "" : "s"
                      } on ${tournament.name}`}
                </h1>
              </CardHeader>
              <Divider />
              <CardBody>
                <TournamentandPLayer />
              </CardBody>
              <CardFooter>
                {params.id && (
                  <Button
                    onClick={() => {
                      navigate(`/tournaments/${params.id}/addplayers`);
                    }} className="bg-purple-600 text-white border border-purple-600 shadow-md hover:bg-purple-800 hover:border-purple-400"
                  >
                    Add player
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        ) : (
          <p>Loading tournament information...</p>
        )}
      </div>
    </>
  );
}