import React from "react";
import { Navbar } from "@nextui-org/react";
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";

export function Navigation() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <Navbar position="static">
      <div
        className="flex justify-between py-5 p-3"
        onClick={handleNavigate}
        style={{ cursor: "pointer" }}
      >
        <p className="text-2xl font-bold">Better Golf</p>
      </div>
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>
    </Navbar>
  );
}
