import {
  cloneElement,
  createContext,
  useContext,
  useState,
  type ReactNode,
  type ReactElement,
} from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

// ---- Context type ----
type ModalContextType = {
  openName: string;
  open: (name: string) => void;
  close: () => void;
};

type ModalChildProps = {
  onCloseModal?: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export default function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  children,
  opens: openWindowName,
}: {
  children: ReactElement<{ onClick?: () => void }>;
  opens: string;
}) {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("Modal.Open must be used within <Modal>");

  const { open } = ctx;
  return cloneElement(children, { onClick: () => open(openWindowName) });
}

function Window({
  children,
  name,
}: {
  children: ReactElement<ModalChildProps>;
  name: string;
}) {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("Modal.Window must be used within <Modal>");

  const { openName, close } = ctx;
  const ref = useOutsideClick<HTMLDivElement>(close, true);

  if (name !== openName) return null;

  const container = document.body.querySelector("main");

  if (!container) return null; // ✅ guard for null

  return createPortal(
    <div
      id="overlay"
      className=" fixed top-0 bottom-0 right-0 left-0 w-full h-[100] duration-500 bg-[#201815cc] flex items-center justify-center z-[10000]"
    >
      <div
        ref={ref}
        className={`${
          openName === "edit-form" && "w-[85%] h-[85%] overflow-scroll"
        } relative rounded-lg p-[3.2rem_4rem] duration-500 shadow-md bg-[#fcf8f1]`}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            close();
          }}
          className="cursor-pointer absolute top-4 left-4"
        >
          <HiXMark size={25} />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    container
  );
}

Modal.Open = Open;
Modal.Window = Window;
