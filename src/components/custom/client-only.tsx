"use client";
import { useEffect, useState } from "react";

function ClientOnly({
  children,
  ...delegated
}: React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
}
export default ClientOnly;
