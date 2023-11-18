import { BranchA, BranchB } from "./branches";
import useRenderingCounter from "../../hooks/useRenderingCounter.tsx";
import { RenderingInfo } from "../../utils/string.tsx";
import { useState } from "react";

export default function Root() {
  console.log("root render");

  const count = useRenderingCounter();
  const [x, setX] = useState(1);

  return (
    <div className="not-prose flex flex-col items-center gap-2 rounded-lg border-2 border-slate-500 bg-blue-50 pb-2 pt-3 text-center">
      <h2>Root</h2>
      <p className="pb-3 text-sm">
        <RenderingInfo count={count} />
      </p>
      <div className="flex w-full flex-col gap-2 px-2 md:flex-row">
        <BranchA x={x} />
        <BranchB setX={setX} />
      </div>
    </div>
  );
}
