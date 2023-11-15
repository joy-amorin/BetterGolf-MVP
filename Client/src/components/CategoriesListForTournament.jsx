
import { useEffect, useState } from "react";
import { getAllCategory } from "../api/categories.api";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Tooltip, Button } from "@nextui-org/react";
import { EditIcon } from "../assets/EditIcon";
import {Link, useNavigate, useParams } from "react-router-dom";


import { addcategorieToTournament } from "../api/tournaments.api";

export function CategoryListForTournament( ) {
// Creamos una variable para guardar las categorías originales
const params = useParams()
const navigate = useNavigate()
const [originalCategories, setOriginalCategories] = useState([]);
const [Category, setCategory] = useState([])

useEffect(() => {
  async function loadCategory() {
    // Solo cargamos las categorías si el arreglo original está vacío
    if (originalCategories.length === 0) {
      const res = await getAllCategory();
      // Guardamos las categorías originales en el estado
      setOriginalCategories(res.data);
      // Copiamos las categorías originales al arreglo Category
      setCategory([...res.data]);
    }
  }
  loadCategory();
}, [originalCategories.length]);

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
        {Category.map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.name}</TableCell>
            <TableCell>
              <div className="relative flex items-center gap-2">
                <Tooltip content="Edit">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon
                      onClick={async () => {
                        addcategorieToTournament(params.id, category.id);
                        // Usamos el arreglo original para filtrar la categoría que se agregó al torneo
                        setCategory(originalCategories.filter(element => element.id !== category.id))
                        console.log(Category)
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
    <Button onClick={async () => {navigate(`/tournaments/${params.id}/categories`)}}> Pushme</Button>
  </div>
);

}

