
"use client";
import { Modal, ModalBody, ModalHeader, Button } from "flowbite-react";

interface ReasonModalProps {
    show: boolean;
    onClose: () => void;
    onSelect: (reason: string) => void;
}

const ReasonModal: React.FC<ReasonModalProps> = ({ show, onClose, onSelect }) => {
    const reasons = ["fun", "learning", "both"];

    return (
        <div className="bg-gray-300 w-[80%]">

        <Modal show={show} size="sm" onClose={onClose} popup>
            <ModalHeader />
            <ModalBody>
                <div className="text-center">
                    <h2 className="text-base font-bold mb-4 text-black">
                        Why are you attending?
                    </h2>

                    <div className="flex flex-col gap-3">
                        {reasons.map((reason) => (
                            <Button
                                key={reason}
                                color="light"
                                onClick={() => onSelect(reason)}
                            >
                                {reason.charAt(0).toUpperCase() + reason.slice(1)}
                            </Button>
                        ))}
                    </div>

                    <Button
                        color="gray"
                        onClick={onClose}
                        className="mt-4"
                    >
                        Cancel
                    </Button>
                </div>
            </ModalBody>
        </Modal>
                </div>

    );
};

export default ReasonModal;
