import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Button, makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import ValidationForm from './ValidationForm';
import { UpdateValidation, EditValidation } from '../../../../api/caseManager/validations';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import SubmitButton1 from '../../../buttons/submitButton';
import CancelButton from '../../../buttons/CancelButton';
import { urlRegExp } from '../../../../config/constants';
import { useSelector, useDispatch } from 'react-redux';
import { InitDelteFiles,fileSelector } from '../../../../redux/features/file_slice';
import { useSnackbar } from "notistack";
const useStyles = makeStyles((theme) => ({
    tittle: {
        padding: '0px 5px',
        width: 'fit-content',
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
    },
    SubmitBtn: {
        backgroundColor: 'rgb(25, 118, 210)',
        color: 'white',
        borderRadius: 30,
        outline: 'none',
        fontSize: '12px',
        width: '10%',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#02676b',
        },
    },
    dialog: {
        position: 'absolute',
        top: 10,

    }
}));
export default function EditValidationDialog({ open, data, ...props }) {
    const { t } = useTranslation();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [currentUpdated, setCurrentUpdated] = useState({});
    const [imagesUrl, setImagesUrl] = useState([]);
    const {deleteFiles} = useSelector(fileSelector)
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch()
    const ValidationSchema = Yup.object().shape({
        name: Yup.string().required(t('required')),
        description: Yup.string().required(t('required')),
        type_id: Yup.string().required(t('required')),
        status: Yup.string().required(t('required')),
        //   images: Yup.string().required(t('required')),
    });
    useEffect(() => {
        if (data != null && open == true) {
            EditValidation({ 'id': data.id }).then(
                (res) => {
                    console.log(res.data.media.length)
                    setImagesUrl(res.data.media.map(x => { return { 'url': x.full_url, 'id': x.id, 'model_id': data.id } }));
                    setCurrentUpdated(res.data)
                }
            )
        }

    }, [data, open])


    //EditDonor

    useEffect(() => {
        dispatch(InitDelteFiles())
    }, [])
    //EditDonor
  

    const handleClose = () => {
        dispatch(InitDelteFiles())
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
                {t('update_object', { dynamicValue: t('validation') })}
            </DialogTitle>
            <Formik
                enableReinitialize={true}
                validateOnChange={true}
                validationSchema={ValidationSchema}
                initialValues={{ ...currentUpdated, images: [] }}
                initialStatus={{ edit: true }}
                onSubmit={async (values) => {
                    setLoading(true)
                    console.log(values)
                    values['delete_files'] = deleteFiles
                    values['images'] = values['images'] != undefined ? values['images'].map(x => x.file_name).filter(function (el) {
                        return el != null;
                    }) : undefined;
                    UpdateValidation(data.id, values).then((result) => {
                        if (result.success) {
                            dispatch(InitDelteFiles())
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
                            {<ValidationForm image_url={data.image_url} images_url={imagesUrl} />}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                {t('cancel')}
                            </Button>
                       
                            <Button
                                color="primary"
                                className={classes.SubmitBtn}
                                disabled={loading}
                                type="submit"
                            >
                                {/* {isSubmitting ? 'Loading' : status.edit ? t('update')  : t('create')} */}

                                {loading &&  t('loading')}
                                {!loading && t('update')}

                            </Button>
                        </DialogActions>

                    </form>
                )}
            </Formik>

        </Dialog >)
}
