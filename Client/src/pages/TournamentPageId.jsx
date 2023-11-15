import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTournamentById,
  getAllPlayersInTournament,
  deleteTournament,
} from "../api/tournaments.api";
import { PlayersListForTournament } from "../components/PlayersListForTournament";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { TournamentsFormPage } from "./TournamentsFormPage";
import { toast } from "react-hot-toast";
import { TournamentandPLayer } from "./TournamentAndPlayer";

export function TournamentPage() {
  const [tournament, setTournament] = useState(null);
  const [numOfPlayers, setNumOfPlayers] = useState(null);
  const { id } = useParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  const params = useParams();
  const [size, setSize] = React.useState("md");
  const [backdrop, setBackdrop] = React.useState("opaque");
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
        {tournament ? (
          <div>
            <Card className="bg-zinc-800 dark:bg-zinc-900 mt-12">
           
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
                <p className="text-gray-700 dark:text-gray-300">
                  {tournament.description}
                </p>
              </CardBody>
              <CardFooter className="flex justify-between">
                <Button onPress={() => handleOpen("")}>
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
                     const suceso = await deleteTournament(params.id);
                  
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
            <Card className="mt-12">
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
                    }}
                  >
                    Add player
                  </Button>
                )}
              </CardFooter>
            </Card>
            <Button onClick={() => navigate("categories")}>Tournament-Categories</Button>
          </div>
        ) : (
          <p>Loading tournament information...</p>
        )}
      </div>
    </>
  );
}
