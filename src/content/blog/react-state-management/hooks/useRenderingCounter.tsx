import {useRef} from "react";

export default function useRenderingCounter() {
  const count = useRef(0);

  count.current++;

  return count.current;
}
