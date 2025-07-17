import type React from "react";

import { GoGraph } from "react-icons/go";
import DashDock from "../../components/dashDock/dashDock";

function Dashboard(): React.ReactNode {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full gap-2">
      <div className="flex flex-row w-full h-16 bg-amber-200 justify-center items-center gap-2">
        <GoGraph size={28} />
        <p className="text-lg px-2 font-medium"> Overview </p>
      </div>
      <DashDock />
    </div>
  );
}

export default Dashboard;
