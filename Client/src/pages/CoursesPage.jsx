/* import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { CoursesList } from "../components/CoursesList";
import { Button } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { CoursesFormPage } from "./CoursesFormPage";
import { getAllCourses, deleteCourse } from "../api/courses.api";
import { useState, useEffect } from "react";
import { Tooltip } from "@nextui-org/react";
import { EditIcon } from "../assets/EditIcon";
import { DeleteIcon } from "../assets/DeleteIcon";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { set } from "react-hook-form";

export function CoursesPage() {
  // Usa useState para declarar el estado courses
  const [courses, setCourses] = useState([]);
  const [refetch, setRefetch] = useState(true);
  // Usa useDisclosure para manejar el estado del modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // Usa useEffect para cargar los cursos cuando el componente se monta
  useEffect(() => {
    //  verificar si refetch es true
    async function loadCourses() {
      const res = await getAllCourses();
      setCourses(res.data);
        setRefetch(false);
      }
      if (refetch) {
      loadCourses();
    }
  }, [refetch]); // Mantiene refetch como dependencia
  const cambiarValor = ( ) => {
    setRefetch(true); // Aquí cambiamos el valor del estado del padre a false
  };

  return (
    <div className="w-80%">
      <div className="w-3/4 ml-10">
        <Button onPress={onOpen} color="primary" className="mb-3">
          Add Course
        </Button>
        <Modal
          isOpen={isOpen}
          // Pasa la función handleOpenChange por referencia al prop onOpenChange
          onOpenChange={onOpenChange}
          isDismissable={false}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  New Course
                </ModalHeader>
                <ModalBody>
                  <CoursesFormPage onclose={onClose} setRefetch={cambiarValor} />
                </ModalBody>
                <ModalFooter></ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
      <div className="flex flex-wrap gap-4 mt-10 w-3/4 ">
        {courses.map((course) => (
          <Card className="py-4 w-5/6 ml-11" key={course.id}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
              <p className="text-tiny uppercase font-bold">{course.id}</p>
              <small className="text-default-500">{course.name}</small>
              <h4 className="font-bold text-large">{course.courseSlope}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                  <div className="relative flex items-center gap-2">
                    <Tooltip content="Edit">
                      <Link to={`/courses/${course.id}`}>
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
                              await deleteCourse(course.id);
                              setRefetch(!refetch);
                              let updatedcourses = courses.filter(
                                (course) => course.id !== course.id
                              );
                              setCourses(updatedcourses);
                              toast.success("Course deleted");
                            }
                          }}
                        />
                      </span>
                    </Tooltip>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-tiny uppercase font-bold">
                      {course.email}
                    </p>
                    <small className="text-default-500">{course.id}</small>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
} */
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { CoursesFormPage } from "./CoursesFormPage";
import { getAllCourses, deleteCourse, getCourseById } from "../api/courses.api";
import { useState, useEffect } from "react";
import { Tooltip } from "@nextui-org/react";
import { EditIcon } from "../assets/EditIcon";
import { DeleteIcon } from "../assets/DeleteIcon";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Co } from "../components/CourseById";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'

export function CoursesPage() {
  // Usa useState para declarar el estado courses
  const [courses, setCourses] = useState([]);

  const [refetch, setRefetch] = useState(true);
  // Usa useDisclosure para manejar el estado del modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // Usa useEffect para cargar los cursos cuando el componente se monta
  const navigate = useNavigate();
  useEffect(() => {
    //  verificar si refetch es true
    async function loadCourses() {
      const res = await getAllCourses();
      setCourses(res.data);
        setRefetch(false);
      }
      if (refetch) {
      loadCourses();
    }
  }, [refetch]); // Mantiene refetch como dependencia
  const cambiarValor = ( ) => {
    setRefetch(true); // Aquí cambiamos el valor del estado del padre a false
  };


   

  return (
    <div className="w-80%">
      <div className="w-3/4 ml-10">
        <Button onPress={onOpen} color="primary" className="mb-1">
          Add Course
        </Button>
        <Modal
          isOpen={isOpen}
          // Pasa la función handleOpenChange por referencia al prop onOpenChange
          onOpenChange={onOpenChange}
          isDismissable={false}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  New Course
                </ModalHeader>
                <ModalBody>
                  <CoursesFormPage onclose={onClose} setRefetch={cambiarValor} />
                </ModalBody>
                <ModalFooter></ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
      <div className="flex flex-wrap gap-4 mt-10 w-2/4  bg-y-hidden ">
        {courses.map((course) => (
          <Card className="py-1 w-5/6 ml-11 bg-gradient-to-r from-green-500 to-blue-500 bg-opacity-10" key={course.id}
          >
            <CardHeader onClick={ async () => {navigate(`/courses/${course.id}/`)}} className="pb-1 pt-0 px-2 display-flex flex-row border-b border-2 border-gray-300">
              <p className="text-tiny uppercase font-bold">{course.id}</p>
              <small className="text-2xl text-black-500">{course.name}</small>
              <h4 className="font-bold text-large">{course.courseSlope}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                  <div className="relative flex items-center gap-2">
                    <Tooltip content="Edit">
                      <Link to={`/courses/${course.id}`}>
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
                              await deleteCourse(course.id);
                              setRefetch(!refetch);
                              let updatedcourses = courses.filter(
                                (course) => course.id !== course.id
                              );
                              setCourses(updatedcourses);
                              toast.success("course deleted");
                            }
                          }}
                        />
                      </span>
                    </Tooltip>
                  </div>
                 
                </div>
                <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="shadow"
          color="default" 
        >
          Detalles
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new"> <Co valor={course.id} /></DropdownItem>
      </DropdownMenu>
    </Dropdown>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
