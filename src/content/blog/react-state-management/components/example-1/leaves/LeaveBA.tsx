import useRenderingCounter from "../../../hooks/useRenderingCounter.tsx";
import useStore from "../store";
import { RenderingInfo } from "../../../utils/string.tsx";

export function LeaveBA() {
  console.log("leaveBA render");

  const count = useRenderingCounter();
  const counterB = useStore((state) => state.counterB);

  return (
    <div className="sm:w-1/2 flex flex-col justify-between rounded-lg border-2 border-slate-500 bg-amber-200 p-2">
      <h4 className="text-lg">LeaveBA</h4>
      <p className="py-3 text-sm">
        <RenderingInfo count={count} />
      </p>
      <p className="pb-2.5 text-lg font-bold">Y = {counterB}</p>
    </div>
  );
}
