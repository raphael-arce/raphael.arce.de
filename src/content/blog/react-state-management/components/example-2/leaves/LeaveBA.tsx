import useRenderingCounter from "../../../hooks/useRenderingCounter.tsx";
import { RenderingInfo } from "../../../utils/string.tsx";
import React from "react";

export function LeaveBA({
  setX,
}: {
  setX: React.Dispatch<React.SetStateAction<number>>;
}) {
  console.log("LeaveBA render");

  const count = useRenderingCounter();

  return (
    <div className="flex h-full flex-col items-center justify-between rounded-lg border-2 border-slate-500 bg-red-200 p-2 sm:w-1/2">
      <h4 className="text-lg">LeaveBA</h4>
      <p className="py-3 text-sm">
        <RenderingInfo count={count} />
      </p>
      <button
        className="btn w-24 rounded-full border-none bg-red-500 text-lg text-black hover:bg-red-400"
        onClick={() => setX((previousX) => previousX * 2)}
      >
        X*2
      </button>
    </div>
  );
}
