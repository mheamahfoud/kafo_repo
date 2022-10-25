import React from 'react';
import {Button , makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import store from '../../../services/redux/Redux';
import { connect } from 'react-redux';
const useStyles = makeStyles((theme) => ({

    dialog: {
        position: 'absolute',
        top: 50
    }
}));

function AlertDialogRedux({ dialog_open, message, callBack, title }) {
    const handleClose = () => {
        store.dispatch({
            type: 'SET_CONFIRM_DIALOG_OPEN',
            payload: false,
        });
    };

    const handleCloseYes = () => {
        callBack();
    };
    const classes = useStyles();
 
    return (
        <div>
            <Dialog
                open={dialog_open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={handleCloseYes} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state) => ({
    dialog_open: state.confirm_dialog.dialog_open,
});
export default connect(mapStateToProps)(AlertDialogRedux);
