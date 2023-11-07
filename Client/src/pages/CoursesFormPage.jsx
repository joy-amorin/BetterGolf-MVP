
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  createCourse,
  deleteCourse,
  updateCourse,
  getCourseById,
} from "../api/courses.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Button, Input } from "@nextui-org/react";

export function CoursesFormPage( { onclose, setRefetch } ) {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateCourse(params.id, data);
      toast.success("Updated Course succesfully"),  navigate("/Courses"),
        {
          position: "bottom-right",
          style: {
            background: "#2fff00",
            color: "#fff",
          },
        };
    } else {
      await createCourse(data);
      setRefetch();
      toast.success("Course created succesfully"),
        {
          position: "bottom-right",
          style: {
            background: "#2fff00",
            color: "#fff",
          },
        };
    }
  });

  useEffect(() => {
    async function loadCourse() {
      if (params.id) {
        const res = await getCourseById(params.id);
        console.log(res.data);
        setValue("name", res.data.name);
        setValue("courseSlope", res.data.courseSlope);
        setValue("courseRating", res.data.courseRating);
        setValue("par", res.data.par);
       
      }
    }
    loadCourse();
  }, []);

  return (
		<div className="max-w-xl mx-auto">
		
				<form onSubmit={onSubmit}>
					<div className="mb-3">
						<Input
							type="text"
							label="Course name"
							placeholder={errors.name ? "Required" : ""}
							{...register("name", { required: true })}
						/>
					</div>
					<div className="mb-3">
						<Input
							type="number"
							label="Course slope"
							placeholder={errors.courseSlope ? "Required" : ""}
							{...register("courseSlope", { required: true })}
						/>
					</div>
					<div className="mb-3">
						<Input
							type="number"
							label="Course rating"
							placeholder={errors.courseRating ? "Required" : ""}
							{...register("courseRating", { required: true })}
						/>
					</div>
          <div className="flex justify-start mb-3">
					<Button color="primary" type="submit" onClick={() => {if (!params.id){onclose()}else{ setRefetch}}}>
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
            await deleteCourse(params.id);
            toast.success("Course deleted"), navigate("/course");
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
          navigate(`/courses/${params.id}/holes`);
        }}
        >
      ver todos los holes in course
      </Button>
    </div>
  )}
  {params.id && (
    <div className="flex justify-end">
      <Button
        color="danger"
        onClick={async () => {
          navigate(`/courses/${params.id}/addcourses`);
        }}
        >
      Agregar holes
      </Button>
    </div>
  )}
</div>
);
}	
				
