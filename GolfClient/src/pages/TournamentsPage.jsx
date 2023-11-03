import { TournamentsList } from "../components/TournamentsList";
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { TournamentsFormPage } from "./TournamentsFormPage";

export function TournamentsPage() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} color="primary" className="mb-3">Create Tournament</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">New Tournament</ModalHeader>
              <ModalBody>
                <TournamentsFormPage />
              </ModalBody>
              <ModalFooter>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <h1 className="mb-3">Tournaments</h1>
      <TournamentsList />
    </>
  );
}
