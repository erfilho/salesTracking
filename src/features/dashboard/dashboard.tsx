import type React from "react";

import { GoGraph } from "react-icons/go";
import DashDock from "../../components/dashDock/dashDock";

function Dashboard(): React.ReactNode {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <div className="flex h-16 w-full flex-row items-center justify-center gap-2 bg-amber-200">
        <GoGraph size={28} />
        <p className="px-2 text-lg font-medium"> Overview </p>
      </div>
      <DashDock />
    </div>
  );
}

export default Dashboard;
