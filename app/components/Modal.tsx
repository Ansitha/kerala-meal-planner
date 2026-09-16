"use client";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div
        className="
          relative
          bg-white dark:bg-gray-800 dark:text-white
          w-full max-w-lg
          max-h-[85vh]
          overflow-y-auto
          p-6
          rounded-2xl
          shadow-2xl
          border border-gray-300 dark:border-gray-700
        "
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute top-3 right-3
            text-gray-500 dark:text-gray-300
            hover:text-gray-700 dark:hover:text-white
            text-xl font-bold
          "
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
