import useRenderingCounter from "../../../hooks/useRenderingCounter.tsx";
import { useState } from "react";
import { LeaveAA, LeaveAB } from "../leaves";
import { RenderingInfo } from "../../../utils/string.tsx";

export function BranchA() {
  console.log("branchA render");

  const count = useRenderingCounter();
  const [counterA, setCounterA] = useState(1);

  return (
    <div className="flex flex-col gap-2 rounded-lg border-2 border-slate-500 bg-red-50 py-2 sm:w-1/2">
      <h3 className="text-lg">
        BranchA: <i>useState</i>
      </h3>
      <p className="pb-2 text-sm">
        <RenderingInfo count={count} />
      </p>
      <div className="flex h-full flex-col gap-2 px-2 sm:flex-row">
        <LeaveAA counterA={counterA} />
        <LeaveAB setCounterA={setCounterA} />
      </div>
    </div>
  );
}
