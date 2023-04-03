import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Statistic from "./Statistic/Statistic";
import {adminActions} from "../redux/slice/admin.slice";
import {useDispatch} from "react-redux";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({id}) {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const submit1 = async ()=> {
        await dispatch(adminActions.userStatistic({id: id}));
        setOpen(true);
        // setVisible(!visible);
    }

    return (
        <div>
            <button onClick={submit1}>Statistic</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Statistic
                    </Typography>
                    <Typography id="modal-modal-description" component={'span'} variant={'body2'} sx={{ mt: 2 }}>
                       <Statistic/>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
