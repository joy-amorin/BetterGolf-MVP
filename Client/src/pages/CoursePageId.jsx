import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCourseById,

  deleteCourse,
  getHolesInCourses,
} from "../api/Courses.api";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { CoursesFormPage } from "./CoursesFormPage";
import { toast } from "react-hot-toast";
/* import { CourseandPLayer } from "./CourseandPLayer"; */
import { CoursesAndHole } from "./CoursesAndHoles";

export function CoursePageId() {
  const [course, setCourse] = useState(null);
  const [numOfPlayers, setNumOfPlayers] = useState(null);
  const { id } = useParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  const params = useParams();

  const [size, setSize] = React.useState("md");
  const [backdrop, setBackdrop] = React.useState("opaque");

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  const handleBackdropChange = (newBackdrop) => {
    setBackdrop(newBackdrop);
  };

  const [refetch, setRefetch] = React.useState(true);

  const handleRefetch = () => {
    setRefetch((prevRefetch) => !prevRefetch);
  };

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await getCourseById(id);
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching Course:", error);
      }
    }

    async function fetchNumOfPlayers() {
      try {
        const response = await getHolesInCourses(id);
        setNumOfPlayers(response.data.length);
      } catch (error) {
        console.error("Error fetching number of players:", error);
      }
    }

    fetchCourse();
    fetchNumOfPlayers();
  }, [id, refetch]);

  return (
    <>
      <div>
        {course ? (
          <div>
            <Card>
              <CardHeader>
                <h1 className="text-3xl font-bold">{course.name}</h1>
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="mb-3 text-gray-700 dark:text-gray-300 text-tiny uppercase font-bold">
                 Slope :  { course.courseSlope}
                </p>
                <p className="mb-3 text-gray-700 dark:text-gray-300 text-tiny uppercase font-bold">
                 Rating :  {course.courseRating}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                 Par :  {course.par}
                </p>
              </CardBody>
              <CardFooter className="flex justify-between">
                <Button onPress={() => handleOpen("")}>
                  Edit info
                  <Modal
                    size={"2xl"}
                    backdrop={"blur"}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    isDismissable={false}
                  >
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                          <ModalBody>
                            <CoursesFormPage
                              onClose={onClose}
                              setRefetch={handleRefetch}
                            />
                          </ModalBody>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </Button>
                <Button
                  color="danger"
                  onClick={async () => {
                    const accepted = window.confirm(
                      "Are you sure you want to delete this Course?"
                    );
                    if (accepted) {
                      await deleteCourse(id);
                      toast.success("Course deleted");
                      navigate("/Courses");
                    }
                  }}
                >
                  Delete Course
                </Button>
              </CardFooter>
            </Card>
            <Divider className="my-3" />
            <Card>
              <CardHeader>
                <h1 className="text-3xl font-bold">
                  {numOfPlayers === 0
                    ? `No players on ${Course.name}`
                    : `${numOfPlayers} Player${
                        numOfPlayers === 1 ? "" : "s"
                      } on ${course.name}`}
                </h1>
              </CardHeader>
              <Divider />
              <CardBody>
               {/*  <PlayersListForCourse CourseId={id} /> */}
               <CoursesAndHole />
      
              </CardBody>
              <CardFooter>
                {params.id && (
                  <Button
                    onClick={() => {
                      navigate(`/Courses/${params.id}/holes`);
                    }}
                  >
                    Add player
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        ) : (
          <p>Loading Course information...</p>
        )}
      </div>
    </>
  );
}