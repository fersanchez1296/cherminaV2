// components/RouteChangeLoader.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "../loader/Loader";

export const RouteChangeLoader = () => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500); // simula carga mínima

    return () => clearTimeout(timeout);
  }, [pathname]);

  return isLoading ? <Loader /> : null;
};
