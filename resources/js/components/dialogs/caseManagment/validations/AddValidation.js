import { Formik } from 'formik';
import { makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React, { Fragment } from 'react';
import ValidationForm from './ValidationForm';
import { CreateValidation } from '../../../../api/caseManager/validations';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import SubmitButton from '../../../buttons/submitButton';
import CancelButton from '../../../buttons/CancelButton';
import { useSnackbar } from "notistack";
import { urlRegExp } from '../../../../config/constants';
const useStyles = makeStyles((theme) => ({
    tittle: {
        padding: '0px 5px',
        width: 'fit-content',
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
    },
    dialog: {
        position: 'absolute',
        top: 10,
      
    }
}));

export default function AddValidationDialog({ open, ...props }) {
    const { t } = useTranslation();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = React.useState(false);
    const ValidationSchema = Yup.object().shape({
        name: Yup.string().required(t('required')),
        description: Yup.string().required(t('required')),
        type_id: Yup.string().required(t('required')),
        status: Yup.string().required(t('required')),
        //  images: Yup.string().required(t('required')),
    });
    const handleClose = () => {
        props.onClose();
    };
    return (
        <Dialog
            classes={{
                paper: classes.dialog
            }}
            {...props}
            open={open}
            fullWidth
            disableBackdropClick
            maxWidth={'md'}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle className={classes.tittle} id="form-dialog-title">
                {t('add_object', { dynamicValue: t('validation') })}
            </DialogTitle>
            <Formik
                validateOnChange={true}
                enableReinitialize={true}
                validationSchema={ValidationSchema}
                initialValues={{ 'images': [], 'case_id': props.case_id }}
                initialStatus={{ edit: false }}
                onSubmit={async (values) => {
                    setLoading(true)
                    values['images'] = values['images'] != undefined ? values['images'].map(x => x.file_name).filter(function (el) {
                        return el != null;
                    }) : undefined;
                    CreateValidation(values).then((result) => {
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
                                    ValidationSchema.fields,
                                ).map((field) =>
                                    props.setFieldTouched(field, true),
                                ) &&
                                Object.keys(props.errors).map((item) => {
                                    enqueueSnackbar(t(item) + ' ' + t('not_valid'), {
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
                            {<ValidationForm image_url={undefined} />}
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
