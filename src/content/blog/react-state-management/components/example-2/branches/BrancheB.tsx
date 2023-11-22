import useRenderingCounter from "../../../hooks/useRenderingCounter.tsx";
import { LeaveBA, LeaveBB } from "../leaves";
import { RenderingInfo } from "../../../utils/string.tsx";
import React from "react";

export function BranchB({
  setX,
}: {
  setX: React.Dispatch<React.SetStateAction<number>>;
}) {
  console.log("BranchB render");

  const count = useRenderingCounter();

  return (
    <div className="flex flex-col rounded-lg border-2 border-slate-500 bg-blue-100 py-2 sm:w-1/2">
      <h3>BranchB</h3>
      <p className="pb-3 text-sm">
        <RenderingInfo count={count} />
      </p>
      <div className="flex h-full flex-col gap-2 px-2 sm:flex-row">
        <LeaveBA setX={setX} />
        <LeaveBB />
      </div>
    </div>
  );
}
