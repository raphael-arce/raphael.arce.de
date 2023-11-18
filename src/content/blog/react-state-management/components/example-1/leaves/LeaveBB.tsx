import useRenderingCounter from "../../../hooks/useRenderingCounter.tsx";
import useStore from "../store";
import { RenderingInfo } from "../../../utils/string.tsx";

export function LeaveBB() {
  console.log("leaveBB render");

  const count = useRenderingCounter();
  const increaseB = useStore((state) => state.increaseB);

  return (
    <div className="flex h-full flex-col items-center justify-between rounded-lg border-2 border-slate-500 bg-amber-200 p-2 md:w-1/2">
      <h4 className="text-lg">LeaveBB</h4>
      <p className="py-3 text-sm">
        <RenderingInfo count={count} />
      </p>
      <button
        className="btn w-28 rounded-full border-none bg-amber-500 text-lg text-black hover:bg-amber-400"
        onClick={() => increaseB()}
      >
        Y*2
      </button>
    </div>
  );
}
