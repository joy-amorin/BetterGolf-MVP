import { PlayersList } from "../components/PlayersList";
import { Button } from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { PlayersFormPage } from "./PlayersFormPage";
import { useState } from "react";

export function PlayersPage() {
  const [refetch, setRefetch] = useState(true); 
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
   
 
    // Llamamos al setter del estado con el valor que recibimos
  
  return (
    <div>
      <Button onPress={onOpen} color="primary" className="mb-3">Add Player</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">New Player</ModalHeader>
              <ModalBody>
                <PlayersFormPage  cambiarEstado={ setRefetch } onClose={onClose}/>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <PlayersList refetch={refetch} />
    </div>
  );
}
/* import { PlayersList } from "../components/PlayersList";
import { Button } from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { PlayersFormPage } from "./PlayersFormPage";
import { useState } from "react";

export function PlayersPage() {
  const [refetch, setRefetch] = useState(true); 
  const {Open, setOpen, toggle} = useDisclosure();
   
  function cambiarEstado(valor) {
    // Llamamos al setter del estado con el valor que recibimos
    setRefetch(valor);
  }
  return (
    <div>
      <Button onPress={Open} color="primary" className="mb-3">Add Player</Button>
      <Modal
        isOpen={Open}
        onOpenChange={onOpenChange}
        isDismissable={false}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">New Player</ModalHeader>
              <ModalBody>
                <PlayersFormPage  cambiarEstado={cambiarEstado} onClose={() => setOpen(false)}/>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <PlayersList refetch={refetch} />
    </div>
  );
} */