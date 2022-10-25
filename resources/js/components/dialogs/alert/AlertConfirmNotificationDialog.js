import React, { useState, useEffect } from 'react';
import { Button, makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {
    TextField,
    InputLabel,
    Box,
    Grid
} from '@material-ui/core';
import { Close } from '@mui/icons-material';
import IconButton from '@material-ui/core/IconButton';
import { Image, } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { mainColor } from '../../../config/constants';
import { globalSelector } from '../../../redux/features/global_slice';
import { setNotificationIcon } from '../../../redux/features/global_slice';
import { setDialogConfirmNotificationOpen } from '../../../redux/features/global_slice';
const useStyles = makeStyles((theme) => ({
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
    },
    Circle: {
        height: '10px',
        width: '10px',
        backgroundColor: 'red',
        borderRadius: '50%',
        display: 'inline-block',
        margin: '3px',
        marginLeft: '12px',
    },
    inputLabel: {
        width: '100%',
        marginTop: '3px',
        padding: '0px',
    },
    addfileBtn: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        borderRadius: 30,
    },
    input: {
        display: 'none',
    },
}));


export default function AlertConfirmNotificationDialog({ dialog_open, message, callBack, title ,...props}) {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const [uploadedImage, setUploadedImage] = useState(undefined);
    const classes = useStyles();
    const handleUploadImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            let data = new FormData();
            const fileReader = new FileReader();
            fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                    dispatch(setNotificationIcon(

                        fileReader.result

                    ))
                    setUploadedImage(URL.createObjectURL(event.target.files[0]));
                }
            };
            fileReader.readAsDataURL(event.target.files[0]);

        }

        return;
    };


    //  const {setFieldValue} =useFormikContext();
    const { dialog_confirm_notification_open, notification_data, notification_icon } = useSelector(globalSelector)
    const handleClose = () => {
        dispatch(setNotificationIcon(undefined))


        dispatch(setDialogConfirmNotificationOpen(false))
    };

    const handleCloseYes = () => {
        callBack();
    };

    React.useEffect(() => {
        // if (notification_icon != undefined)
        setUploadedImage(undefined)
    }, []);
    return (
        <div>
            <Dialog
                open={dialog_confirm_notification_open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                classes={{
                    paper: classes.dialog
                }}
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>{notification_data.title}</DialogTitle>


                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                        <h5 className="w-100">{
                            t('send_notification_by_action')
                        }</h5>
                    </DialogContentText>

                    <Grid container spacing={2}>
                        <Grid item md={12} sm={12} xs={12}>

                            <div style={{ width: '100%' }}>
                                <input
                                    className={classes.input}
                                    id="upload-image2"
                                    type="file"
                                    accept="image/*"
                                    //  accept="application/pdf,text/plain,.doc, .docx,image/*"
                                    onChange={handleUploadImage}
                                />
                              
                                <Box display="flex" width={'100%'}>
                                    <Box  >
                                        <label
                                            htmlFor={'upload-image2'

                                            }
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            <Button
                                                component="span"
                                                variant="contained"
                                                fullWidth
                                                style={{
                                                    color: '#fff',
                                                    backgroundColor: mainColor,
                                                }}

                                            >
                                                {t('choose_image')}
                                            </Button>
                                        </label>
                                    </Box>
                                    <Box display="flex">
                                        {(uploadedImage) && (<IconButton
                                            style={{
                                                outline: 'none',
                                                color: '#0e8e93',
                                                width: '30px',
                                                height: '30px',
                                                backgroundColor: '#9BC9CB',
                                                margin: '10px',
                                                border: '1px solid #389497',
                                            }}
                                            aria-label="delete"
                                            className={classes.margin}
                                            onClick={() => {
                                                dispatch(setNotificationIcon(
                                                    undefined
                                                ))
                                                setUploadedImage(undefined);
                                            }}
                                        >
                                            <Close fontSize="small" />
                                        </IconButton>)}
                                    </Box>


                                    {(uploadedImage) && (<Box  >
                                        <Image
                                            src={uploadedImage}
                                            thumbnail
                                            style={{ width: '120px' }}
                                        />

                                    </Box>)}




                                </Box>
                            </div >

                        </Grid>



                    </Grid>

                </DialogContent>

                <DialogActions className="justify-content-center">


                    <Button onClick={handleClose} type="button" className={classes.CancelBtn}>
                        {t('no')}
                    </Button>
                    <Button onClick={handleCloseYes} type="button" className={classes.OkBtn}  disabled={props.loading}>
                        {t('yes')}
                    </Button>





                </DialogActions>
            </Dialog>
        </div>
    );
}



