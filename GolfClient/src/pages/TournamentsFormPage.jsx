import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  createTournament,
  deleteTournament,
  updateTournament,
  getTournamentById,
} from "../api/tournaments.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Input, Textarea, Button } from "@nextui-org/react";

export function TournamentsFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams(); // para obtener el id de la url
  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTournament(params.id, data);
      toast.success("Tournament updated succesfully"),
        {
          position: "bottom-right",
          style: {
            background: "#2fff00",
            color: "#fff",
          },
        };
    } else {
      await createTournament(data);
      toast.success("Tournament created succesfully"),
        {
          position: "bottom-right",
          style: {
            background: "#2fff00",
            color: "#fff",
          },
        };
    }
    navigate("/tournaments");
  });

  useEffect(() => {
    async function loadTournament() {
      if (params.id) {
        const res = await getTournamentById(params.id);
        console.log(res.data);
        setValue("name", res.data.name);
        setValue("description", res.data.description);
        setValue("tournamentType", res.data.tournamentType);
        setValue("startDate", res.data.startDate);
        setValue("endDate", res.data.endDate);
      }
    }
    loadTournament();
  }, []);

  return (
    <div>

    { !params.id && <h1 className="mb-3">New Tournament</h1>}
    { params.id && <h1 className="mb-3">Edit Tournament</h1>}
    <div className="max-w-xl mx-auto p-4 mb-6">
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <Input
            type="text"
            label="Tournament Name"
            placeholder={errors.name ? "Required" : ""}
            {...register("name", { required: true })}
          />
        </div>
        <div className="mb-3">
          <Textarea
            label="Description"
            placeholder={errors.description ? "Required" : ""}
            {...register("description", { required: false })}
          />
        </div>
        <div className="mb-3">
          <Input
            type="text"
            label="Type"
            placeholder={errors.tournamentType ? "Required" : ""}
            {...register("tournamentType", { required: true })}
          />
        </div>
        <div className="flex space-x-4 mb-3">
          <Input
            type="date"
            label="Start date"
            placeholder={errors.startDate ? "Required" : " "}
            {...register("startDate", { required: false })}
          />
          <Input
            type="date"
            label="End date"
            placeholder={errors.endDate ? "Required" : " "}
            {...register("endDate", { required: false })}
            />
        </div>
        <div className="flex justify-start mb-3">
          <Button color="primary" type="submit">
            Save
          </Button>
        </div>
      </form>
      {params.id && (
        <div className="flex justify-end">
          <Button
            color="danger"
            onClick={async () => {
              const accepted = window.confirm("Confirm");
              if (accepted) {
                await deleteTournament(params.id);
                toast.success("Tournament deleted"), navigate("/tournaments");
              }
            }}
            >
            Delete
          </Button>
        </div>
      )}
      {params.id && (
        <div className="flex justify-end">
          <Button
            color="danger"
            onClick={async () => {
              navigate(`/tournaments/${params.id}/players`);
            }}
            >
          ver todos los jugadores en este torneo
          </Button>
        </div>
      )}
      {params.id && (
        <div className="flex justify-end">
          <Button
            color="danger"
            onClick={async () => {
              navigate(`/tournaments/${params.id}/addplayers`);
            }}
            >
          Agregar jugadores a un torneo
          </Button>
        </div>
      )}
    </div>
      </div>
  );
}
