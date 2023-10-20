import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, closeModal, children }: ModalProps) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // Handle the Escape key press here
        closeModal();
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener("keyup", handleEscapeKey);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keyup", handleEscapeKey);
    };
  }, []);

  if (!isOpen) return null;
  return (
    <div
      onClick={closeModal}
      className={`fixed w-full h-full top-0 left-0 flex bg-black bg-opacity-50 z-40 items-center justify-center`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" min-w-[200px] w-2/3 max-w-[360px] bg-white h-3/4 text-black rounded shadow-lg"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
