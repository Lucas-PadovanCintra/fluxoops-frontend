import { useContext } from "react";
import { DemandasContext } from "./demandas-context";

export function useDemandas() {
  const ctx = useContext(DemandasContext);

  if (!ctx) {
    throw new Error("useDemandas must be used within DemandasProvider");
  }

  return ctx;
}
