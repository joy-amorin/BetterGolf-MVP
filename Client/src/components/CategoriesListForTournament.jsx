import { useEffect, useState } from "react";
import { getAllCategory } from "../api/categories.api";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { EditIcon } from "../assets/EditIcon";
import { DeleteIcon } from "../assets/DeleteIcon";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { set } from "react-hook-form";
import { addcategorieToTournament } from "../api/tournaments.api";

export function CategoryListForTournament() {
  const [Category, setCategory] = useState([]);
  const params = useParams(); // para obtener el id de la url
  /*   const tournamentid = parseInt(params.id, 10) */
  const navigate = useNavigate();
  useEffect(() => {
    async function loadCategory() {
      const res = await getAllCategory();
      setCategory(res.data);
    }
    loadCategory();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <Table
        color={"primary"}
        selectionMode="single"
        defaultSelectedKeys={["3"]}
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {Category.map((player) => (
            <TableRow key={player.id}>
              <TableCell>{player.name}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Edit">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EditIcon
                        onClick={async () => {
                          addcategorieToTournament(params.id, player.id);
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
      <Button
        onClick={async () => {
          navigate(`/tournaments/${params.id}/categories`);
        }}
      >
        {" "}
        Pushme
      </Button>
    </div>
  );
}
