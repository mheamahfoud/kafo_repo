import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Button, makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import SuccessStoryForm from './SuccessStoryForm';
import { EditSuccessStroy, UpdateSuccessStory } from '../../../api/successStrories/SuccessStrory';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import SubmitButton from '../../buttons/submitButton';
import CancelButton from '../../buttons/CancelButton';
import { urlRegExp } from '../../../config/constants';
import { useSelector, useDispatch } from 'react-redux';
import { fileSelector, InitDelteFiles } from '../../../redux/features/file_slice';
import { useSnackbar } from "notistack";
import LoadingElement from '../../progressLoading/LoadingElement';
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
export default function EditSuccessStoryDialog({ open, data, ...props }) {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false);
    const [currentUpdated, setCurrentUpdated] = useState({});
    const [loadingData, setLoadingData] = React.useState(true);
    const [imagesUrl, setImagesUrl] = useState([]);
    const SuccessStoryScehma = Yup.object().shape({
        case_id: Yup.string().required(t('required')).nullable(),
        vedio_url: Yup.string().matches(urlRegExp, t('url_valid')).nullable(),
        description: Yup.string().required(t('required')).nullable(),
        cover_photo: Yup.array().of(Yup.string()).required(t('required')),
    });
    const {deleteFiles} = useSelector(fileSelector)

    useEffect(() => {
        dispatch(InitDelteFiles())
    }, [])


    useEffect(() => {
        if (data != null && open == true) {
            EditSuccessStroy({ 'id': data.id }).then(
                (res) => {
                    console.log(res.data.media.length)
                    setImagesUrl(res.data.media.map(x => { return { 'url': x.full_url, 'id': x.id, 'model_id': data.id } }));
                    setCurrentUpdated(res.data)
                    setLoadingData(false)
                }
            )
        }

    }, [data, open])


    //EditDonor
    const classes = useStyles();

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
                {t('update_object', { dynamicValue: t('case') })}
            </DialogTitle>
            <Formik
                enableReinitialize={true}
                validateOnChange={true}
                validationSchema={SuccessStoryScehma}
                initialValues={{ ...currentUpdated, images: [], cover_photo: [], }}
                initialStatus={{ edit: true }}
                onSubmit={async (values) => {
                    setLoading(true)
                    //alert(JSON.stringify(deleteFiles))
                    console.log(values)
                   
                    values['delete_files'] = deleteFiles
                    // }
                    values['images'] = values['images'] != undefined ? values['images'].map(x => x.file_name).filter(function (el) {
                        return el != null;
                    }) : undefined;
                    UpdateSuccessStory(data.id, values).then((result) => {
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
                                    SuccessStoryScehma.fields,
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
                            {loadingData ?  <LoadingElement/>  : <SuccessStoryForm image_url={data?.image_url} images_url={imagesUrl} />}
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

                                {loading && t('loading')}
                                {!loading && t('update')}

                            </Button>

                        </DialogActions>

                    </form>
                )}
            </Formik>

        </Dialog >)
}
