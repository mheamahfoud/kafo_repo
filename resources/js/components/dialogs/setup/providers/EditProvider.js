import { Formik } from 'formik';
import { makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React, { Fragment } from 'react';
import ProviderForm from './ProviderForm';
import { UpdateProvider, } from '../../../../api/setUp/provider';
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
        top: 50
    }
}));
export default function EditProvider({ open,data, ...props }) {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const ProviderSchema = Yup.object().shape({
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
            maxWidth={'md'}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle className={classes.tittle} id="form-dialog-title">
            {t('update_object', { dynamicValue: t('provider') })  }
            </DialogTitle>
            <Formik
                enableReinitialize={true}
                validationSchema={ProviderSchema}
                initialValues={data}
                initialStatus={{ edit: true }}
                validateOnChange={false} // Add this line
                values={data}
              

                onSubmit={async (values) => {
                    setLoading(true)
                    UpdateProvider(data.id, values).then((result) => {
                        if (result.success) {
                            enqueueSnackbar(t('updated_successfully'), {
                                variant: 'success',
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                },
                            });
                            setLoading(false)
                            props.onClose()
                            var temp=result.data;
                            temp['related_cases_count']=data['related_cases_count']
                            temp['related_validation_count']=data['related_validation_count']
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
                                    ProviderSchema.fields,
                                ).map((field) =>
                                    props.setFieldTouched(field, true),
                                ) &&
                                Object.keys(props.errors).map((item) => {
                                    enqueueSnackbar(t(item)  + ' ' + t('required'), {
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
                            {<ProviderForm  image_url ={data.image_path}/>}
                        </DialogContent>
                        <DialogActions>
                            <CancelButton handleClose={handleClose} />
                            <SubmitButton isSubmitting={loading}  isEdit={props.status && props.status.edit} />

                        </DialogActions>

                    </form>
                )}
            </Formik>

        </Dialog>)
}
