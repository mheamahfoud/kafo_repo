import { Formik } from 'formik';
import { makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React, { Fragment,useEffect } from 'react';
import AdminForm from './AdminForm';
import { CreateAdmin, } from '../../../../api/userManagment/admin';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import SubmitButton from '../../../buttons/SubmitButton';
import CancelButton from '../../../buttons/CancelButton';
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


export default function AddAdmin({ open, ...props }) {
    const { t } = useTranslation();
    const [loading, setLoading] = React.useState(false);
    const AdminSchema = Yup.object().shape({
        full_name: Yup.string().required(t('required')),
        user_name: Yup.string().required(t('required')),
        email: Yup.string().email(t('valid_email')),

        password: Yup.string().required(t('required')),
        passwordConfirmation: Yup.string()
           .oneOf([Yup.ref('password'), null], t('Passwords_must_match'))
           .required(t('required'))
      
    });
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        if (open) {
            setLoading(false)
        }
    }, [open])
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
                {t('add_object', { dynamicValue: t('admin') })}
            </DialogTitle>
            <Formik
                enableReinitialize={true}
                validationSchema={AdminSchema}
                validateOnChange={true} 
                initialValues={{email:undefined}}
                initialStatus={{ edit: false }}
                onSubmit={async (values) => {
                    setLoading(true)
                    values['email']=!values['email'] ?undefined :values['email'];
                    CreateAdmin(values).then((result) => {
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
                            props.isValid
                                ? props.handleSubmit(e)
                                : Object.keys(
                                    AdminSchema.fields,
                                ).map((field) =>
                                    props.setFieldTouched(field, true),
                                ) &&
                                Object.keys(props.errors).map((item) => {
                                    // enqueueSnackbar(t(item)  + ' ' + t('required'), {
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
                            {<AdminForm />}
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
