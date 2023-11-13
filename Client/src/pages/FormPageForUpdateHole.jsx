import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  
  deleteHoles, updateHoles,
} from "../api/holes.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Button, Input } from "@nextui-org/react";
import { getHolesById } from "../api/holes.api";

export function HolesFormUpdate({ onclose, setRefetch }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();
	const navigate = useNavigate();
	let {  holeId} = useParams();
  console.log(holeId);
	const onSubmit = handleSubmit(async (data) => {
	
			await updateHoles(holeId, data);
			cambiarValor();
			toast.success("Holes update succesfully");
		
	});
	const cambiarValor = () => {
		setRefetch(true);
	};

	useEffect(() => {
		async function loadHoles() {
	
				const res = await getHolesById(holeId);
				console.log(res.data);
				setValue("par", res.data.par);
				setValue("number", res.data.number);
				setValue("strokeIndex", res.data.strokeIndex);
				
    }
		loadHoles();
	}, []);

  return (
		<div className="max-w-xl mx-auto">
			<form onSubmit={onSubmit}>
				<div className="mb-3">
					<Input
						type="text"
						label="par"
						placeholder={errors.par ? "Required" : ""}
						{...register("par", { required: true })}
					/>
				</div>
				<div className="mb-3">
					<Input
						type="text"
						label="number"
						placeholder={errors.number ? "Required" : ""}
						{...register("number", { required: true })}
					/>
				</div>
				<div className="mb-3">
					<Input
						type="text"
						label="strokeIndex"
						placeholder={errors.strokeIndex ? "Required" : ""}
						{...register("strokeIndex", { required: true })}
					/>
				</div>
				<Button color="primary" type="submit" onClick={() => onclose() }>
					Save
				</Button>
			</form>

		</div>
	);
}
