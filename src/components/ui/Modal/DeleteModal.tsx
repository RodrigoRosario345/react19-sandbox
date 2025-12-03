import { useModal } from "@/hooks";
import { Spinner } from "flowbite-react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Button } from "../Button/Button";

export interface DeleteModalProps {
    itemName?: string;
    onDelete: () => void | Promise<void>;
    onClose: () => void;
}

export function DeleteModal({
    itemName,
    onDelete,
    onClose,
}: DeleteModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const { backdropRef, modalRef, closeModal } = useModal({ onClose });

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await onDelete();
            closeModal();
        } catch (error) {
            console.error("Delete failed:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                ref={backdropRef}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                onClick={isDeleting ? undefined : closeModal}
                aria-hidden="true"
            />

            {/* Modal */}
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-modal-title"
                aria-describedby="delete-modal-description"
                className="max-w-sm fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            >
                <div className="relative w-full flex flex-col gap-7 p-6 rounded-2xl font-sans bg-white text-center shadow-2xl">
                    <Button
                        parentMethod={closeModal}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                        aria-label="close"
                    >
                        <IoClose className="size-7" />
                    </Button>


                    {/* Icon */}
                    <div className="text-7xl mx-auto text-red-600">
                        <AiOutlineCloseCircle aria-hidden="true" />
                    </div>

                    {/* Title */}
                    <h2
                        id="delete-modal-title"
                        className="text-2xl font-semibold text-red-600"
                    >
                        Are you sure?
                    </h2>

                    {/* Description */}
                    <p id="delete-modal-description" className="text-gray-600">
                        Do you really want to delete this {itemName}?
                        <span className="block mt-1 text-sm text-gray-500">
                            This action cannot be undone.
                        </span>
                    </p>

                    {/* Actions */}
                    <div className="flex gap-3 mt-2">
                        <Button
                            parentMethod={closeModal}
                            disabled={isDeleting}
                            className="flex-1 py-1.5 rounded-md bg-gray-400 hover:bg-gray-500 text-white"
                        >
                            Cancel
                        </Button>
                        <Button
                            parentMethod={handleDelete}
                            disabled={isDeleting}
                            className="flex-1 rounded-md bg-red-600 hover:bg-red-700 text-white"
                        >
                            {isDeleting ? (
                                <>
                                    <Spinner
                                        size="sm"
                                        aria-label="Info spinner example"
                                        className="me-3"
                                        light
                                    />
                                    Deleting...
                                </>
                            ) : (
                                "Delete"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
