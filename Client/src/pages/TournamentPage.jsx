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

export function TournamentPage() {
  const [tournament, setTournament] = useState(null);
  const [numOfPlayers, setNumOfPlayers] = useState(null);
  const { id } = useParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  const params = useParams();
  const [size, setSize] = React.useState("md");
  const [backdrop, setBackdrop] = React.useState("opaque"); // Agrega el estado backdrop
  const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "full"];
  const backdrops = ["opaque", "blur", "transparent"];

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  const handleBackdropChange = (newBackdrop) => {
    setBackdrop(newBackdrop);
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
  }, [id]);

  return (
    <>
      <div>
        {tournament ? (
          <div>
            <Card>
              <CardHeader>
                <h1 className="text-3xl font-bold">{tournament.name}</h1>
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="mb-3 text-gray-700 dark:text-gray-300 text-tiny uppercase font-bold">
                  {new Date(tournament.startDate).toLocaleDateString()} -{" "}
                  {new Date(tournament.endDate).toLocaleDateString()}
                </p>
                <p className="mb-3 text-gray-700 dark:text-gray-300 text-tiny uppercase font-bold">
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
                            <TournamentsFormPage onClose={onClose} />
                          </ModalBody>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </Button>
                <Button
                  color="danger"
                  onClick={async () => {
                    const accepted = window.confirm("Confirm");
                    if (accepted) {
                      await deleteTournament(id);
                      toast.success("Tournament deleted"), navigate("/tournaments");
                    }
                  }}
                >
                  Delete torunament
                </Button>
              </CardFooter>
            </Card>
            <Divider className="my-3" />
            <Card>
              <CardHeader>
                <h1 className="text-3xl font-bold">
                  {numOfPlayers === 0
                    ? `No players on ${tournament.name}`
                    : `${numOfPlayers} Player${numOfPlayers === 1 ? "" : "s"
                    } on ${tournament.name}`}
                </h1>
              </CardHeader>
              <Divider />
              <CardBody>
                <PlayersListForTournament tournamentId={id} />
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
          </div>
        ) : (
          <p>Loading tournament information...</p>
        )}
      </div>
    </>
  );
}
