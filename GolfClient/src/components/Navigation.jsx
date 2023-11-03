import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export function Navigation() {
  return (
    <div>
      <div className="flex justify-between py-5 p-3">
        <Link to="/">
          <h1 className="font-bold text-3xl mb-4">BetterGolf</h1>
        </Link>
      </div>
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>
    </div>
  );
}
