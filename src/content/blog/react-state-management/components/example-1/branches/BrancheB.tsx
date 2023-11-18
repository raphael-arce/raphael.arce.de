import useRenderingCounter from "../../../hooks/useRenderingCounter.tsx";
import { LeaveBA, LeaveBB } from "../leaves";
import { RenderingInfo } from "../../../utils/string.tsx";

export function BranchB() {
  console.log("Branch B render");

  const count = useRenderingCounter();

  return (
    <div className="flex flex-col gap-2 rounded-lg border-2 border-slate-500 bg-amber-50 py-2 md:w-1/2">
      <h3 className="text-lg">
        BranchB: <i>zustand</i>
      </h3>
      <p className="pb-2 text-sm">
        <RenderingInfo count={count} />
      </p>
      <div className="flex h-full flex-col gap-2 px-2 md:flex-row">
        <LeaveBA />
        <LeaveBB />
      </div>
    </div>
  );
}
