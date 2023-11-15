import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { scoreCardResults } from "../api/scorecard.api";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Button,
  Input,
  Select,
  SelectSection,
  SelectItem,
} from "@nextui-org/react";

export function HolesForScorecards({ onclose, setRefetch }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const onSubmit = handleSubmit(async (data) => {
    try {
      // Crear un arreglo de promesas con los fetch de cada stroke
      const promises = Array.from({ length: 9 }).map((_, i) => {
        // Construir la url con el número de stroke y la cantidad
        const url = `http://localhost:5001/api/ScorecardResults/${i + 1}/${data[`strokes${i + 1}`]}`;
        // Enviar los datos con fetch y devolver la promesa
        return fetch(url, { method: "Put", body: JSON.stringify(data) });
      });
      
      await Promise.all(promises);
      // Mostrar un mensaje de éxito
      toast.success("Updated Scorecard succesfully");
      navigate(`/tournaments/${params.id}`);
    } catch (error) {
      // Manejar el error
    }
  });
  

  const cambiarValor = () => {
    setRefetch(true);
  };

  useEffect(() => {
    async function loadScorecard() {
      for (let i = 1; i <= 9; i++) {
        const res = await scoreCardResults(params.id, i);
        setValue(`strokes${i}`, res.data.strokes);
      }
    }
    loadScorecard();
  }, []);

  return (
    <div class="max-w-xl mx-auto grid grid-cols-6 hv-1/2">
    <form onSubmit={onSubmit}>
         {Array.from({ length: 9 }).map((_, i) => (
           <div class="p-2 border flex-1" key={i}>
             <Input
               type="number"
               label={`stroke${i + 1}`}
               placeholder={errors.strokes ? "Required" : ""}
               {...register(`strokes${i + 1}`, { required: true })}
             /> 
        </div>
      ))}
  
      <div class="flex justify-center col-span-6 mt-4">
        <Button color="primary" type="submit">
          Save
        </Button>
      </div>
    </form>
  </div>
  
  );
}
