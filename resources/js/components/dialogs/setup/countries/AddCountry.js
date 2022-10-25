import { Formik } from 'formik';
import { makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React, { Fragment } from 'react';
import CountryForm from './CountryForm';
import { CreateCountry, } from '../../../../api/setUp/country';
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


export default function AddCountry({ open, ...props }) {
    const { t } = useTranslation();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = React.useState(false);
    const CountrySchema = Yup.object().shape({
        name: Yup.string().required(t('required')),
        ar_name: Yup.string().required(t('required'))
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
            maxWidth={'sm'}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle className={classes.tittle} id="form-dialog-title">

                {t('add_object', { dynamicValue:  t('country') })  }
              
            </DialogTitle>
            <Formik
                enableReinitialize={true}
                validationSchema={CountrySchema}
                initialValues={{ 'name': '' }}
                initialStatus={{ edit: false }}
                onSubmit={async (values) => {
                    setLoading(true)
                    CreateCountry(values).then((result) => {
                        // alert(JSON.stringify(result.success))
                        if (result.success) {
                            setLoading(false)
                            enqueueSnackbar(t('added_successfully'), {
                                variant: 'success',
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                },
                            });
                            props.onClose()
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
                                    CountrySchema.fields,
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
                            {<CountryForm />}
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
