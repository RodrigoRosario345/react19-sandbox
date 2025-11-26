import { useModal } from "@/hooks";
import type { OperationResult } from "@/interfaces/movie.model";
import { useMovieStore } from "@/store/movie.store";
import { Button } from "flowbite-react";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

const MODAL_CONFIG = {
    success: {
        icon: FaCheckCircle,
        title: "Success!",
        buttonText: "OKAY",
        color: "green",
        iconColor: "text-green-500",
    },
    error: {
        icon: IoMdCloseCircle,
        title: "Sorry :(",
        buttonText: "Try Again",
        color: "red",
        iconColor: "text-red-600",
    },
} as const;

interface ModalProps extends OperationResult { }

export function Modal({ status, message }: ModalProps) {
    const clearOperationResult = useMovieStore(
        (state) => state.clearOperationResult
    );
    const { backdropRef, modalRef, closeModal } = useModal({
        onClose: clearOperationResult,
        autoCloseDelay: 4000,
    });

    const config = MODAL_CONFIG[status];
    const Icon = config.icon;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                onClick={closeModal}
                ref={backdropRef}
                aria-hidden="true"
            />

            {/* Modal */}
            <div
                role="dialog"
                aria-modal="true"
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                ref={modalRef}
            >
                <div className="w-full max-w-[320px] flex flex-col gap-5 p-6 rounded-2xl font-sans bg-white text-center shadow-2xl">
                    <div className={`text-7xl mx-auto ${config.iconColor}`}>
                        <Icon />
                    </div>
                    <h2
                        id="modal-title"
                        className={`text-2xl font-semibold ${config.iconColor}`}
                    >
                        {config.title}
                    </h2>
                    <p id="modal-description" className="text-gray-700">
                        {message}
                    </p>
                    <Button
                        onClick={clearOperationResult}
                        color={config.color}
                        className="cursor-pointer"
                    >
                        {config.buttonText}
                    </Button>
                </div>
            </div>
        </>
    );
}
