import useRenderingCounter from "../../../hooks/useRenderingCounter.tsx";
import { RenderingInfo } from "../../../utils/string.tsx";
import React from "react";

export function LeaveAA({ x }: { x: number }) {
  console.log("LeaveAA render");

  const count = useRenderingCounter();
  return (
    <div className="sm:w-1/2 flex flex-col justify-between rounded-lg border-2 border-slate-500 bg-red-200 p-2">
      <h4 className="text-lg">LeaveAA</h4>
      <p className="py-3 text-sm">
        <RenderingInfo count={count} />
      </p>
      <p className="pb-2.5 text-lg font-bold">X = {x}</p>
    </div>
  );
}
