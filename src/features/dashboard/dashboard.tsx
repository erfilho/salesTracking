import type React from "react";

import { GoGraph } from "react-icons/go";
import DashDock from "../../components/dashDock/dashDock";
import Header from "../../components/header";

function Dashboard(): React.ReactNode {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-2">
      <Header title={"Overview"} icon={<GoGraph size={28} />} />
      <DashDock />
    </div>
  );
}

export default Dashboard;
