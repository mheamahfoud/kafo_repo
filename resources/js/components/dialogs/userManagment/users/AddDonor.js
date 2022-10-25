import { Formik } from 'formik';
import { makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React, { Fragment } from 'react';
import DonorForm from './DonorForm';
import { CreateDonor, } from '../../../../api/userManagment/donor';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import SubmitButton from '../../../buttons/submitButton';
import CancelButton from '../../../buttons/CancelButton';
import { phoneRegExp } from '../../../../config/constants';
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
    tittle: {
        padding: '0px 5px',
        width: 'fit-content',
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
    },
    dialog: {
        position: 'absolute',
        top: 50
    }
}));


export default function AddDonor({ open, ...props }) {
    const { t } = useTranslation();
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const DonorSchema = Yup.object().shape({
        mobile: Yup.string().matches(phoneRegExp, t('phone_valid')),
        full_name: Yup.string().required(t('required')),
        secret_name: Yup.string().required(t('required')),
        email: Yup.string().email(t('valid_email')).nullable(),


    });
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
            maxWidth={'md'}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle className={classes.tittle} id="form-dialog-title">

                {t('add_object', { dynamicValue: t('user') })}

            </DialogTitle>
            <Formik
                validateOnChange={true}
                enableReinitialize={true}
                validationSchema={DonorSchema}
                initialValues={{email:undefined}}
                initialStatus={{ edit: false }}
                onSubmit={async (values) => {
                    setLoading(true)
                    values['email']=!values['email'] ?undefined :values['email'];
                   
                    CreateDonor(values).then((result) => {
                        // alert(JSON.stringify(result.success))
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
                            props.setAddRow(result.data)
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
                            props.isValid && Object.keys(props.values).length >0
                                ? props.handleSubmit(e)
                                : Object.keys(
                                    DonorSchema.fields,
                                ).map((field) =>
                                    props.setFieldTouched(field, true),
                                ) &&
                                Object.keys(props.errors).map((item) => {
                                    // enqueueSnackbar(t(item) + ' ' + t('required'), {
                                    //     variant: 'error',
                                    //     anchorOrigin: {
                                    //         vertical: 'bottom',
                                    //         horizontal: 'center',
                                    //     },
                                    // });
                                });
                        }}
                        style={{ width: '100%' }}
                        autoComplete="off"
                    >

                        <DialogContent>
                            <DialogContentText></DialogContentText>
                            {<DonorForm image_url={undefined} />}
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
