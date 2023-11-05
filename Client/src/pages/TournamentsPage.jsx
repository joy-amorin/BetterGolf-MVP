import { TournamentsList } from "../components/TournamentsList";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { TournamentsFormPage } from "./TournamentsFormPage";

export function TournamentsPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const [backdrop, setBackdrop] = React.useState("opaque"); // Agregar el estado backdrop
  const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "full"];
  const backdrops = ["opaque", "blur", "transparent"];
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


  return (
    <div>
      <Button onPress={onOpen} color="primary" className="mb-3">
        Create Tournament
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={false}
          size={"lg"}
          backdrop={"blur"}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader></ModalHeader>
                <ModalBody>
                  <TournamentsFormPage onClose={onClose} setRefetch={handleRefetch} />
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </Button>
      <TournamentsList refetch={refetch} />
    </div>
  );
}
