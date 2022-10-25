import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import DonorForm from './DonorForm';
import { UpdateDonor, GetDonor } from '../../../../api/userManagment/donor';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import SubmitButton from '../../../buttons/submitButton';
import CancelButton from '../../../buttons/CancelButton';
import { useSnackbar } from "notistack";
import { phoneRegExp } from '../../../../config/constants';
import LoadingElement from '../../../progressLoading/LoadingElement';
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
export default function EditDonor({ open, data, ...props }) {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const [currentUpdated, setCurrentUpdated] = useState({});
    const [loadingData, setLoadingData] = React.useState(true);

    const DonorSchema = Yup.object().shape({
        mobile: Yup.string().matches(phoneRegExp, t('phone_valid')).nullable(),
        full_name: Yup.string().required(t('required')).nullable(),
        secret_name: Yup.string().required(t('required')).nullable(),
     //   email: Yup.string().email(t('valid_email')).required(t('required')).nullable(),
        email: Yup.string().email(t('valid_email')).nullable(),

    });
    const [loading, setLoading] = React.useState(false);
    useEffect(() => {
        if (data?.id != undefined && open) {
            setLoading(false)
            GetDonor({ 'id': data.id }).then(
                (res) => {
                    console.log(res.data)
                    setCurrentUpdated(res.data)
                    setLoadingData(false)
                }
            )
        }

    }, [open])


    //EditDonor
    const classes = useStyles();

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
            maxWidth={'md'}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle className={classes.tittle} id="form-dialog-title">
                {t('update_object', { dynamicValue: t('provider') })}
            </DialogTitle>
            <Formik
                enableReinitialize={true}
                validateOnChange={true}
                validationSchema={DonorSchema}
                initialValues={{ ...currentUpdated,  }}
                initialStatus={{ edit: true }}
                onSubmit={async (values) => {
                    setLoading(true)
                    values['email']=!values['email'] ?undefined :values['email'];
                    values['mobile']=!values['mobile'] ?undefined :values['mobile'];
                    UpdateDonor(data.id, values).then((result) => {
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
                                    DonorSchema.fields,
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
                            {loadingData ?  <LoadingElement/>  :<DonorForm image_url={data.image_path} />}
                        </DialogContent>
                        <DialogActions>
                            <CancelButton handleClose={handleClose} />
                            <SubmitButton isSubmitting={loading} isEdit={props.status && props.status.edit} />

                        </DialogActions>

                    </form>
                )}
            </Formik>

        </Dialog >)
}
