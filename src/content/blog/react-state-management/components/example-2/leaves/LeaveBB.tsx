import useRenderingCounter from "../../../hooks/useRenderingCounter.tsx";
import { RenderingInfo } from "../../../utils/string.tsx";
import useStore from "../store";
import React from "react";

export function LeaveBB() {
  console.log("leaveAA render");

  const count = useRenderingCounter();
  const doubleY = useStore((state) => state.doubleY);

  return (
    <div className="sm:w-1/2 flex h-full flex-col items-center justify-between rounded-lg border-2 border-slate-500 bg-amber-200 p-2">
      <h4 className="text-lg">LeaveBB</h4>
      <p className="py-3 text-sm">
        <RenderingInfo count={count} />
      </p>
      <button
        className="btn w-24 rounded-full border-none bg-amber-500 text-lg text-black hover:bg-amber-400"
        onClick={doubleY}
      >
        Y*2
      </button>
    </div>
  );
}
