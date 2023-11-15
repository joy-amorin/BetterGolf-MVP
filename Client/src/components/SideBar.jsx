import { Listbox,  ListboxSection,  ListboxItem } from "@nextui-org/react";
import React from "react";
import { IconWrapper } from "../components/IconWrapper"
import { ItemCounter } from "../components/ItemCounter";
import { TrophyIcon } from "../assets/TrophyIcon";
import { UserIcon } from "../assets/UserIcon";
import { ResultsIcon } from "../assets/ResultsIcon";
import { Link, useNavigate } from "react-router-dom";
import { CoursesIcon } from "../assets/CoursesIcon";


export function SideBar() {
  const navigate = useNavigate();
  return (
    <div className="flex bg-zinc-900 text-slate-200 rounded-md  ">
      <Listbox
        aria-label="SideBar"
        className="h-screen pl-2 pb-6 pt-2 gap-2 divide-y divide-default-300/50 dark:divide-default-100/80 max-w-[400px] overflow-visible shadow-sm dark:shadow-gray-800"
        itemClasses={{
          base: "px-3 rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
        }}
      >
        <ListboxItem 
          onClick={() => {
            navigate("/tournaments");
          }}
          key="Tournaments"
          /* endContent={<ItemCounter number={13} />} */
          startContent={
            <IconWrapper className="bg-success/10 text-success">
              <TrophyIcon className=" text-xs  sm:text-lg" />
            </IconWrapper>
          }
        >
          Tournaments
        </ListboxItem>
        <ListboxItem
          onClick={() => {
            navigate("/players");
          }}
          key="Players"
          /* endContent={<ItemCounter number={13} />} */
          startContent={
            <IconWrapper className="bg-success/10 text-success">
              <UserIcon className="text-xs  sm:text-lg " />
            </IconWrapper>
          }
        >
          Players
        </ListboxItem>
        <ListboxItem
          onClick={() => {
            navigate("/courses");
          }}
          key="Courses"
          /* endContent={<ItemCounter number={13} />} */
          startContent={
            <IconWrapper className="bg-success/10 text-success">
              <CoursesIcon className="text-xs  sm:text-lg" />
            </IconWrapper>
          }
        >
          Courses
        </ListboxItem>
        <ListboxItem
          onClick={() => {
            navigate("/categories/1");
          }}
          key="Categories"
          /* endContent={<ItemCounter number={13} />} */
          startContent={
            <IconWrapper className="bg-success/10 text-success">
              <CoursesIcon className="text-lg " />
            </IconWrapper>
          }
        >
          Categories
        </ListboxItem>
      </Listbox>
    </div>
  );
}