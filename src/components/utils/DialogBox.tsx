"use client";
import { useEffect, useState } from "react";
import TertiaryButton from "../Buttons/TertiaryButton";
import IconRenderer from "../IconRenderer/page";

type DialogBoxProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function DialogBox({
  isOpen,
  onClose,
  children,
}: DialogBoxProps) {
  const [showDialog, setShowDialog] = useState(isOpen);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowDialog(true);
      setAnimate(true);

      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };

      window.addEventListener("keydown", handleEsc);
      return () => {
        window.removeEventListener("keydown", handleEsc);
      };
    } else {
      setAnimate(false);
      const timeout = setTimeout(() => setShowDialog(false), 75);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!showDialog) return null;

  return (
    <div
      className="fixed w-screen h-screen inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className={`relative bg-white rounded-xl p-4 sm:p-6 shadow-lg ${
          animate ? "animate-fade-in-zoom" : "animate-fade-out-zoom"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <TertiaryButton
          className="absolute right-3 top-3 text-black/70 p-1 border border-transparent hover:border-black/25"
          onClick={onClose}
        >
          <IconRenderer name="Plus" className="rotate-45" />
        </TertiaryButton>
        {children}
      </div>
    </div>
  );
}
