import {Modal, ModalDialog} from "@mui/joy";
import React, {ReactNode} from "react";

type Props = {
    open: boolean;
    children: ReactNode;

    onClose?: () => void;
}

export function ComponentItemModal({open, children, onClose}: Props) {
    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog
                layout="center"
                size="lg"
                variant="outlined"
                sx={{pt: 0, minWidth: 320}}
            >
                {children}
            </ModalDialog>
        </Modal>
    )
}