// src/components/ui/Modal.tsx
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef } from "react";
import clsx from "clsx";

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";
type ModalPosition = "center" | "top" | "right" | "bottom";

type ModalProps = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: ModalSize;
  position?: ModalPosition;
  closeOnOverlayClick?: boolean;
  className?: string;
};

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
  full: "w-full h-full",
};

const positionClasses: Record<ModalPosition, string> = {
  center: "items-center justify-center",
  top: "items-start justify-center mt-10",
  right: "items-start justify-end",
  bottom: "items-end justify-center",
};

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
  footer,
  size = "md",
  position = "center",
  closeOnOverlayClick = true,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Focus trap (basic)
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={clsx(
            "fixed inset-0 z-[99999] flex bg-black/40 backdrop-blur-sm p-4",
            positionClasses[position]
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => {
            if (closeOnOverlayClick) onClose();
          }}
        >
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            className={clsx(
              "bg-white rounded-lg shadow-xl w-full relative flex flex-col outline-none max-h-[90vh]",
              sizeClasses[size],
              className
            )}
            initial={{
              opacity: 0,
              y: position === "bottom" ? 40 : -20,
              scale: 0.95,
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 ">
              {title && (
                <h2
                  id="modal-title"
                  className="text-lg font-semibold text-gray-900"
                >
                  {title}
                </h2>
              )}
              <button
                onClick={onClose}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="p-4 bg-gray-50 flex justify-end gap-2">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
