import { Formik } from 'formik';
import { makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React, { Fragment } from 'react';
import UpdateForm from './UpdateForm';
import { UpdateCaseUpdate, } from '../../../../api/caseManager/case';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import SubmitButton from '../../../buttons/SubmitButton';
import CancelButton from '../../../buttons/CancelButton';
import { useSnackbar } from "notistack";
import GeneralStyles from '../../../styles/GeneralStyles';

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
export default function EditUpdate({ open,data, ...props }) {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = React.useState(false);
    const classes = useStyles();
    const UpdateSchema  = Yup.object().shape({
        description: Yup.string().required(t('required')),
       
    });
    const handleClose = () => {
        props.onClose();
    };
    return (
        <Dialog
            {...props}
            open={open}
            fullWidth
            classes={{
                paper: classes.dialog
            }}
            disableBackdropClick
            maxWidth={'sm'}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle className={classes.tittle} id="form-dialog-title">
            {t('update_object', { dynamicValue: t('cost') })  }
            </DialogTitle>
            <Formik
                enableReinitialize={true}
                validationSchema={UpdateSchema}
                initialValues={{...data,medias:[]}  }
                initialStatus={{ edit: true }}
                onSubmit={async (values) => {
                    setLoading(true)
                    UpdateCaseUpdate(data.id, values).then((result) => {
                        if (result.success) {
                            enqueueSnackbar(t('updated_successfully'), {
                                variant: 'success',
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                },
                            });
                            props.onClose()
                            setLoading(false)
                            props.setUpdateRow(result.data)
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
                                    enqueueSnackbar(t(item)  + ' ' + t('not_valid'), {
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
                            {<UpdateForm  image_url ={data?.image_url}/>}
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
