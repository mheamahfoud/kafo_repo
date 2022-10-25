import React from 'react';
import { Button, makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { globalSelector, setDialogConfirmUpdateOpen } from '../../../redux/features/global_slice';
import { mainColor } from '../../../config/constants';
const useStyles = makeStyles((theme) => ({
    OkBtn: {
        backgroundColor:"#900",
        color: 'white',
        borderRadius: 30,
        outline: 'none',
        fontSize: '12px',
        width: '10%',
        textTransform: 'none',
        '&:hover': {
            backgroundColor:'green',
        },
    },
    CancelBtn: {
        backgroundColor:mainColor,
        color: 'white',
        borderRadius: 30,
        outline: 'none',
        fontSize: '12px',
        width: '10%',
        textTransform: 'none',
        '&:hover': {
            backgroundColor:'green',
        },
    },
    dialog: {
        position: 'absolute',
        top: 50
    }
}));
export default function AlertConfirmUpdateDialog({ dialog_open, message, callBack, title }) {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const { dialog_confirm_update_open } = useSelector(globalSelector)
    const handleClose = () => {
        dispatch(setDialogConfirmUpdateOpen(false))
    };

    const handleCloseYes = () => {
        callBack();
    };
    const classes = useStyles();

    return (
        <div>
            <Dialog
                open={dialog_confirm_update_open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                classes={{
                    paper: classes.dialog
                }}
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                        <h5 className="w-100">{message}</h5>
                    </DialogContentText>
                </DialogContent>
                <DialogActions className="justify-content-center">


                    <Button onClick={handleClose} type="button"  className={classes.CancelBtn}>
                        {t('no')}
                    </Button>
                    <Button onClick={handleCloseYes} type="button"  className={classes.OkBtn}>
                        {t('yes')}
                    </Button>





                </DialogActions>
            </Dialog>
        </div>
    );
}



