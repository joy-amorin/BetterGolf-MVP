import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { TournamentsFormPage } from "./TournamentsFormPage";
import { TournamentsList } from "../components/TournamentsList";

export function TournamentsPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const [backdrop, setBackdrop] = React.useState("opaque");
  const sizes = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "full",
  ];
  const backdrops = ["opaque", "blur", "transparent"];
  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };
  const handleBackdropChange = (newBackdrop) => {
    setBackdrop(newBackdrop);
  };

  const [refetch, setRefetch] = React.useState(true);
  const [activeTab, setActiveTab] = useState("actives"); // Agrega el estado para controlar la pestaña activa

  const handleRefetch = () => {
    setRefetch((prevRefetch) => !prevRefetch);
  };

  return (
    <div>
      <Button onPress={onOpen}>
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
                  <TournamentsFormPage
                    onClose={onClose}
                    setRefetch={handleRefetch}
                  />
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </Button>
      <div className="text-center py-4">
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tab key="active" title="Active">
            <TournamentsList
              refetch={refetch}
              status={activeTab.toLowerCase()}
            />
          </Tab>
          <Tab key="completed" title="Completed">
            {/* Empty Tab content */}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
