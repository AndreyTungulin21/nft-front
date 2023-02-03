import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

export default function ModalView({ isOpen, className, title, width = 400, children }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        isOpen ? handleOpen() : handleClose()
    }, [isOpen])

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
        >
            <Fade in={open}>
                <Box className={`modalView ${className}`} width={width} sx={style}>
                    <div className='modalView__header'>{title}</div>
                    <div className='modalView__body'>
                        {children}
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}