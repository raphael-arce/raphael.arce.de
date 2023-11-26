import { BranchA, BranchB } from "./branches";
import useRenderingCounter from "../../hooks/useRenderingCounter.tsx";
import { RenderingInfo } from "../../utils/string.tsx";

export default function Root() {
  console.log("root render");

  const count = useRenderingCounter();

  return (
    <div className="not-prose my-6 flex flex-col items-center gap-2 rounded-lg border-2 border-slate-500 bg-blue-50 pb-2 pt-3 text-center">
      <h2 className="text-lg">Root</h2>
      <p className="pb-3 text-sm">
        <RenderingInfo count={count} />
      </p>
      <div className="flex w-full flex-col gap-2 px-2 sm:flex-row">
        <BranchA />
        <BranchB />
      </div>
    </div>
  );
}
