import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Button, makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import SecretInfoForm from './SecretInfoForm';
import { UpdateSecretInfo } from '../../../../api/caseManager/case';

import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import SubmitButton from '../../../buttons/submitButton';
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
        top: 10,
       
    }
}));
export default function EditSecretInfo({ open,data,...props }) {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const [currentUpdated, setCurrentUpdated] = useState({});
    const [imagesUrl, setImagesUrl] = useState([]);
    const [loading, setLoading] = React.useState(false);
    const ValidationSchema = Yup.object().shape({
        phone_number: Yup.string().matches(phoneRegExp, t('phone_valid')).nullable(),
    });
    useEffect(() => {
        if (data && data != null && open == true) {
           /// setImagesUrl(data.provider.media.map(x => { return { 'url': x.full_url, 'id': x.id, 'model_id': data.id } }));
            setCurrentUpdated(data)


        }

    }, [data, open])
  


    

    //EditDonor
    const classes = useStyles();

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
                {t('update_object', { dynamicValue: t('secret_info') })}
            </DialogTitle>
            <Formik
                enableReinitialize={true}
                validateOnChange={true}
                validationSchema={ValidationSchema}
                initialValues={{ ...currentUpdated, images: [] }}
                initialStatus={{ edit: true }}
                onSubmit={async (values) => {
                    setLoading(true)
                    UpdateSecretInfo(props.case_id, values).then((result) => {
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
                            props.setSecretInfo(result.data)
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
                            {<SecretInfoForm />}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                {t('cancel')}
                            </Button>


                            <SubmitButton isSubmitting={loading} isEdit={props.status && props.status.edit} />

                        </DialogActions>

                    </form>
                )}
            </Formik>

        </Dialog >)
}
