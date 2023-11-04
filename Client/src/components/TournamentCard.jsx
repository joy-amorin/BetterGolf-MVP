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
    <div onClick={() => navigate(`/tournaments/${tournament.id}`)}>
      <Card>
        <CardHeader>
          <p className="text-md">
            {tournament.name} - {tournament.startDate}
          </p>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>{tournament.tournamentType}</p>
          <p>Players: {tournament.playerCount}</p>
        </CardBody>
      </Card>
    </div>
  );
}
