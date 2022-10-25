import React, { useEffect, useState } from 'react';
import { Button, Box, makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';
import {
    TextField,
    InputLabel,
    Card,
} from '@material-ui/core';
import { globalSelector, setDialogConfirmOpen, setDialogReasonCaseId, setDialogReasonCaseOpen, setDialogReasonCaseText } from '../../../../redux/features/global_slice';
import { mainColor } from '../../../../config/constants';
const useStyles = makeStyles((theme) => ({
    inputLabel: {
        width: '100%',
        marginTop: '3px',
        padding: '0px',

    },
    Circle: {
        height: '10px',
        width: '10px',
        backgroundColor: 'red',
        borderRadius: '50%',
        margin: '3px',
        marginLeft: '12px',
    },
    OkBtn: {
        backgroundColor: "#900",
        color: 'white',
        borderRadius: 30,
        outline: 'none',
        fontSize: '12px',
        width: '10%',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'green',
        },
    },
    CancelBtn: {
        backgroundColor: mainColor,
        color: 'white',
        borderRadius: 30,
        outline: 'none',
        fontSize: '12px',
        width: '10%',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'green',
        },
    },
    dialog: {
        position: 'absolute',
        top: 50
    }
}));
export default function CancelCaseDialog({ ...props }) {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const [errorMessage, setErrorMessage] = useState('');
    const [touched, setTouched] = useState(false);
    const { dialog_reason_case_open, dialog_reason_case_text } = useSelector(globalSelector);


    const isEmpty = str => !str.trim().length;
    const handleClose = () => {

        dispatch(setDialogReasonCaseId(null))
        dispatch(setDialogReasonCaseText(''))
        dispatch(setDialogReasonCaseOpen(false))
        dispatch(setDialogConfirmOpen(false))


    };
    const classes = useStyles();
    useEffect(() => {
        dispatch(setDialogConfirmOpen(false))



    }, [])
    const handleTouch = () => {
        setTouched(true);
    };

    return (
        <div>
            <Dialog
                open={dialog_reason_case_open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                classes={{
                    paper: classes.dialog
                }}
                fullWidth
                disableBackdropClick
                maxWidth={'sm'}
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>{t('reason_cancel')}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                        <div style={{ width: '100%' }}>
                            <Box display="flex">
                                <Box>
                                    <InputLabel
                                        style={{
                                            color: 'black',
                                            width: 'auto',
                                        }}
                                    >
                                        {t('reason')}
                                    </InputLabel>
                                </Box>
                                <Box>
                                    <Card className={classes.Circle}></Card>
                                </Box>
                            </Box>

                            <Box>
                                <TextField className={classes.inputLabel}
                                    fullWidth
                                    required
                                    error={touched}
                                    multiline
                                    value={dialog_reason_case_text}
                                    helperText={errorMessage}
                                    onChange={(e) => {
                                        setTouched(false);
                                        setErrorMessage('')
                                        dispatch(setDialogReasonCaseText(e.target.value));
                                    }} />

                            </Box>
                        </div>

                    </DialogContentText>
                </DialogContent>
                <DialogActions className="justify-content-center">

                    <Button onClick={handleClose} type="button" className={classes.CancelBtn}>
                        {t('no')}
                    </Button>
                    <Button onClick={() => {
                        if (isEmpty(dialog_reason_case_text)) {
                            setTouched(true);
                            setErrorMessage(t('required'))
                        }
                        else {
                            props.setReportCancelDialogOpen(true)

                        }


                    }} type="button" className={classes.OkBtn}>
                        {t('yes')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}



