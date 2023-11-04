import { useEffect, useState } from "react";
import { getAllPlayers } from "../api/players.api";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Tooltip, Button } from "@nextui-org/react";
import { EditIcon } from "../assets/EditIcon";
import { DeleteIcon } from "../assets/DeleteIcon";
import {Link, useNavigate } from "react-router-dom";
import { deletePlayer } from "../api/players.api";
import { toast } from "react-hot-toast";

export function PlayersList( { refetch, setRefetch } ) {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPlayers() {
      const res = await getAllPlayers();
      setPlayers(res.data);
      setRefetch(false);
    }
    if (refetch) {
    loadPlayers();
  }
  }, [ refetch ]);

  return (
    <div className="flex flex-col gap-3">
      <Table
        color={"primary"}
        selectionMode="single"
        defaultSelectedKeys={["3"]}
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn>MatriculaAUG</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Last Name</TableColumn>
          <TableColumn>Handicap Index</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
            {players.map((player) => (
            <TableRow key={player.id}>
              <TableCell>{player.matriculaAUG}</TableCell>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.lastName}</TableCell>
              <TableCell>{player.handicapIndex}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Edit">
                    <Link to={`/players/${player.id}`}>
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EditIcon />
                      </span>
                    </Link>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <DeleteIcon
                        onClick={async () => {
                          const accepted = window.confirm("Confirm");
                          if (accepted) {
                            await deletePlayer(player.id);
                            var updatedPlayers = players.filter(Player => Player.id !== player.id);
                            setPlayers(updatedPlayers); 
                            toast.success("Player deleted");
                          }
                        }}
                      />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
