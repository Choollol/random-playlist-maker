import { useEffect, useEffectEvent } from "react";

function useOnMount(callback: () => void) {
  const onMount = useEffectEvent(callback);

  useEffect(() => {
    onMount();
  }, []);
}

export default useOnMount;
