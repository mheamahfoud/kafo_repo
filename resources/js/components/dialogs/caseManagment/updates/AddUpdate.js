import { Formik } from 'formik';
import { makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React, { Fragment } from 'react';
import UpdateForm from './UpdateForm';
import { CreateUpdate, } from '../../../../api/caseManager/case';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import SubmitButton from '../../../buttons/submitButton';
import CancelButton from '../../../buttons/CancelButton';
import { setNotificationData, setDialogConfirmNotificationOpen } from '../../../../redux/features/global_slice';
import { useSnackbar } from "notistack";
import { useDispatch } from 'react-redux'
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

export default function AddUpdateDialog({ open, ...props }) {
    const { t } = useTranslation();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch()
    const UpdateSchema = Yup.object().shape({
        description: Yup.string().required(t('required')),

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
                {t('add_object', { dynamicValue: t('update') })}
            </DialogTitle>
            <Formik
                validateOnChange={true}
                enableReinitialize={true}
                validationSchema={UpdateSchema}
                initialValues={{ 'case_id': props.case_id, 'medias': [] }}
                initialStatus={{ edit: false }}
                onSubmit={async (values) => {
                    setLoading(true)
                    CreateUpdate(values).then((result) => {
                        // alert(JSON.stringify(result.success))
                        if (result.success) {

                            enqueueSnackbar(t('added_successfully'), {
                                variant: 'success',
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                },
                            });
                            if (props.is_published) {
                                dispatch(setNotificationData(
                                    {
                                        message: t('add_object', { dynamicValue: t('update') }), title: t('add_object', { dynamicValue: t('update') }), type: 'add_update', case_id: props.case_id
                                    }
                                ))
                                dispatch(setDialogConfirmNotificationOpen(true))
                            }


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
                                    UpdateSchema.fields,
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
                            {<UpdateForm image_url={undefined} />}
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
