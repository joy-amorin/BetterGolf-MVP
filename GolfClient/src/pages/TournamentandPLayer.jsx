import {  getAllPlayersInTournament, addPlayerToTournament, deletePlayerInTournament } from '../api/tournaments.api';

import { DeleteIcon } from "../assets/DeleteIcon";
import { EditIcon } from "../assets/EditIcon";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableColumn } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
/*  */


export function TournamentandPLayer() {

  const [players, setPlayers] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const params = useParams(); // para obtener el id de la url 

  useEffect(() => {
    async function fetchPlayers() {
      if (params.id) {
      const players = await getAllPlayersInTournament(params.id);
      setPlayers(players.data);
    } else { console.log("salio mal")}
    }
    fetchPlayers();
  }, []);
  


 
  return (
    <div>
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
                {/* <Tooltip content='Edit' color="foreground"> 
                <span  className="text-lg text-danger cursor-pointer active:opacity-50"> 
                <EditIcon
                onClick={async () => 
                { await addPlayerToTournament(player.id); setRefetch(!refetch); }} 
                /> 
                </span> 
                </Tooltip> */}
                  <Tooltip color="danger" content="Delete">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <DeleteIcon
                        onClick={async () => {
                          await deletePlayerInTournament(params.id, player.id);
                         
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
  </div>
  );

}