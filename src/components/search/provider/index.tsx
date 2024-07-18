import {
  FC,
  memo,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { GlobalSearchContext } from "../context";

export const GlobalSearchProvider: FC<PropsWithChildren> = memo((props) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleLayoutScroll = useCallback((state: boolean) => {
    const layout = document.getElementById("layout");

    if (layout) {
      if (state) {
        layout.style.maxHeight = "auto";
        layout.style.overflowY = "auto";
      } else {
        layout.style.maxHeight = "100vh";
        layout.style.overflowY = "hidden";
      }
    }
  }, []);

  useEffect(() => {
    toggleLayoutScroll(!open);
  }, [open, toggleLayoutScroll]);

  return (
    <GlobalSearchContext.Provider value={{ open, setOpen }}>
      {props.children}
    </GlobalSearchContext.Provider>
  );
});
