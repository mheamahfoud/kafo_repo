import { Formik } from 'formik';
import { makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React, { Fragment } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import SubmitButton from '../../buttons/SubmitButton';
import CancelButton from '../../buttons/CancelButton';
import { useSnackbar } from "notistack";
import { AcceptRequest } from '../../../api/userManagment/request';
import FormikInputFile from '../../Formik/FormikInputFile';
import FormikSingleInputFile from '../../Formik/FormikSingleInputFile';
import {
    Grid,
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    tittle: {
        padding: '0px 5px',
        width: 'fit-content',
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
    },
    dialog: {
        position: 'absolute',
        top: 10
    }
}));
export default function AcceptRequestDialog({ open, ...props }) {
  
    const { t } = useTranslation();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = React.useState(false);
    const RequestSchema = Yup.object().shape({
        receipt_image: Yup.string().required(t('required'))
       // image: Yup.array().of(Yup.string()).required(t('required')).length >0,
    });
    React.useEffect(()=>{
        setLoading(false)
    },[])
    const handleClose = () => {
        props.onClose();
    };
    return (
        <Dialog
            {...props}
            classes={{
                paper: classes.dialog
            }}
            open={open}
            fullWidth
            disableBackdropClick
            maxWidth={'sm'}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle className={classes.tittle} id="form-dialog-title">

                {t('charge_wallet')}

            </DialogTitle>
            <Formik
                enableReinitialize={true}
                validationSchema={RequestSchema}
                initialValues={{  'id':props.data?.id }}
                initialStatus={{ edit: false }}
                onSubmit={async (values) => {
                    setLoading(true)
                    AcceptRequest(values).then((result) => {
                        if (result.success) {
                            enqueueSnackbar(t('added_successfully'), {
                                variant: 'success',
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                },
                            });
                            props.onClose()
                            setLoading(false)
                            var temp=props.data;
                            temp['image_path']=result.data.image_path;
                           temp['status']='accepted'
                            props.setUpdateRow(temp)
                        } else {
                            setLoading(false)
                            enqueueSnackbar(result.error_description, {
                                variant: 'error',
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                },
                            });
                        }
                    });
                }}
            >
                {({ setFieldValue, ...props }) => (
                    <form
                        onSubmit={(e) => {

                            e.preventDefault();
                            props.isValid
                                ? props.handleSubmit(e)
                                : Object.keys(
                                    RequestSchema.fields,
                                ).map((field) =>
                                    props.setFieldTouched(field, true),
                                ) &&
                                Object.keys(props.errors).map((item) => {
                                    enqueueSnackbar(t(item) + ' ' + t('required'), {
                                        variant: 'error',
                                        anchorOrigin: {
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        },
                                    });
                                });
                        }}
                        style={{ width: '100%' }}
                        autoComplete="off"
                    >

                        <DialogContent>
                            <DialogContentText></DialogContentText>

                            <Grid container spacing={2}>
                                <Grid item md={12} sm={12} xs={12}>

                                    <FormikSingleInputFile
                                        name="receipt_image"
                                        isRequired={true}
                                        image_url={ undefined}
                                        title={t('receipt_image')}
                                        setFieldValue={setFieldValue}
                                    />

                                </Grid>



                            </Grid>

                        </DialogContent>
                        <DialogActions>
                            <CancelButton handleClose={handleClose} />
                            <SubmitButton isSubmitting={loading} isEdit={props.status && props.status.edit} />

                        </DialogActions>

                    </form>
                )}
            </Formik>

        </Dialog>)
}
