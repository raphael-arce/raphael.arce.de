import useRenderingCounter from "../../../hooks/useRenderingCounter.tsx";
import { RenderingInfo } from "../../../utils/string.tsx";

export function LeaveAA({ counterA }: { counterA: number }) {
  console.log("leaveAA render");

  const count = useRenderingCounter();

  return (
    <div className="flex flex-col justify-between rounded-lg border-2 border-slate-500 bg-red-200 p-2 md:w-1/2">
      <h4 className="text-lg">LeaveAA</h4>
      <p className="py-3 text-sm">
        <RenderingInfo count={count} />
      </p>
      <p className="pb-2.5 text-lg font-bold">X = {counterA}</p>
    </div>
  );
}
