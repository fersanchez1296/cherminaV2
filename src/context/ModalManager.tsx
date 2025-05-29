"use client";
import { useReducer, createContext, useContext, ReactNode } from "react";

type ModalState = {
  [key: string]: boolean;
};

type ModalAction = {
  type: "TOGGLE_MODAL";
  payload: { modal: string; value: boolean };
};

const ModalContext = createContext<{
  state: ModalState;
  toggleModal: (modal: string, value: boolean) => void;
} | null>(null);

const initialState: ModalState = {};

function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case "TOGGLE_MODAL":
      return {
        ...state,
        [action.payload.modal]: action.payload.value,
      };
    default:
      return state;
  }
}

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const toggleModal = (modal: string, value: boolean) => {
    dispatch({ type: "TOGGLE_MODAL", payload: { modal, value } });
  };

  return (
    <ModalContext.Provider value={{ state, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModals = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModals must be used within a ModalProvider");
  }
  return context;
};
