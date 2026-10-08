import { createContext, useContext } from "react";
import { LANDSCAPE, type Layout } from "./layout";

// Le format (16:9 aujourd'hui, 9:16 demain) est fourni par la composition.
export const LayoutContext = createContext<Layout>(LANDSCAPE);
export const useLayout = () => useContext(LayoutContext);
