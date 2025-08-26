import { Outlet } from "react-router";
import { Navigation } from "./navigation";

export const AppLayout = () => {
  return (
    <div>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
