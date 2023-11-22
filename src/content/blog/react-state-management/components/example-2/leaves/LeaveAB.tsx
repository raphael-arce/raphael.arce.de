import React from "react";
import useRenderingCounter from "../../../hooks/useRenderingCounter.tsx";
import { RenderingInfo } from "../../../utils/string.tsx";
import useStore from "../store";

export function LeaveAB() {
  console.log("LeaveAB render");

  const count = useRenderingCounter();
  const y = useStore((state) => state.y);

  return (
    <div className="flex flex-col justify-between rounded-lg border-2 border-slate-500 bg-amber-200 p-2 sm:w-1/2">
      <h4 className="text-lg">LeaveAB</h4>
      <p className="py-3 text-sm">
        <RenderingInfo count={count} />
      </p>
      <p className="pb-2.5 text-lg font-bold">Y = {y}</p>
    </div>
  );
}
