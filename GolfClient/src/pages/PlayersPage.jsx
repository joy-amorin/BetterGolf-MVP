import { PlayersList } from "../components/PlayersList";
import { Button } from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { PlayersFormPage } from "./PlayersFormPage";
import { useState } from "react";

export function PlayersPage() {
  const [refetch, setRefetch] = useState(true); 
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
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
                <PlayersFormPage onclose={onClose} setRefetch={setRefetch}/>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <PlayersList refetch={refetch} setRefetch={setRefetch} />
    </div>
  );
}