import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayerById } from "../api/players.api";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { PlayerCard } from "../components/PlayerCard";

export function PlayerPage() {
  const [player, setPlayer] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchPlayer() {
      try {
        const response = await getPlayerById(id);
        setPlayer(response.data);
      } catch (error) {
        console.error("Error fetching player:", error);
      }
    }
    fetchPlayer();
  }, [id]);
  return (
    <div>
      {player ? (
        <div>
          <Card>
            <CardHeader>
              <h1 className="text-3xl font-bold">
                {player.name} {player.lastName}
              </h1>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>
                Birthdate: {new Date(player.birthDate).toLocaleDateString()}
              </p>
              <p>Handicap: {player.handicapIndex}</p>
              <p>Tournaments:</p>
            </CardBody>
            <CardFooter>
              <Button>Edit player</Button>
              <Button className="ml-3" color="danger">
                {" "}
                Delete player
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
