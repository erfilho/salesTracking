import type React from "react";

import DashDock from "../../components/dashDock/dashDock";

function Dashboard(): React.ReactNode {
  return (
    <div className="flex flex-col w-full h-dvh bg-slate-200 static">
      {" "}
      Dashboard page!
      <DashDock />
    </div>
  );
}

export default Dashboard;
