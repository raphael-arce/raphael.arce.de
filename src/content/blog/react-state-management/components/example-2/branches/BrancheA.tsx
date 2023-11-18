import React from "react";
import { LeaveAA, LeaveAB } from "../leaves";
import { RenderingInfo } from "../../../utils/string.tsx";
import useRenderingCounter from "../../../hooks/useRenderingCounter.tsx";

export function BranchA({ x }: { x: number }) {
  console.log("BranchA render");

  const count = useRenderingCounter();

  return (
    <div className="flex flex-col rounded-lg border-2 border-slate-500 bg-blue-100 py-2 md:w-1/2">
      <h3>BranchA</h3>
      <p className="pb-3 text-sm">
        <RenderingInfo count={count} />
      </p>
      <div className="flex h-full flex-col gap-2 px-2 md:flex-row">
        <LeaveAA x={x} />
        <LeaveAB />
      </div>
    </div>
  );
}
