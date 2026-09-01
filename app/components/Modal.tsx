"use client";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-xl shadow-xl w-full max-w-md">
        {children}

        <button
          onClick={onClose}
          className="mt-4 bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
