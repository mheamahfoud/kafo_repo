import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Button, makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import CloseCaseForm from './CloseCaseForm';
import { CloseCase, EditCase } from '../../../../api/caseManager/case';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import SubmitButton from '../../../buttons/submitButton';
import CancelButton from '../../../buttons/CancelButton';
import { urlRegExp } from '../../../../config/constants';
import { useSelector, useDispatch } from 'react-redux';
import { fileSelector,InitDelteFiles } from '../../../../redux/features/file_slice';
import { setNotificationData ,setDialogConfirmNotificationOpen} from '../../../../redux/features/global_slice';
;
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
export default function AddCloseCaseDialog({ open, data, ...props }) {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const {deleteFiles} = useSelector(fileSelector)
    const [loading, setLoading] = React.useState(false);
    const [currentUpdated, setCurrentUpdated] = useState({});
    const [imagesUrl, setImagesUrl] = useState([]);
    const dispatch = useDispatch()
    const CaseSchema = Yup.object().shape({
       // name: Yup.string().required(t('required')),
       // vedio_url: Yup.string().matches(urlRegExp, t('url_valid')),
        description: Yup.string().required(t('required')),
      //  images: Yup.array().of(Yup.string()).required(t('required')),
    });
  
    useEffect(() => {
        if (data != null && open == true) {
            EditCase({ 'id': data.id }).then(
                (res) => {
                    console.log(res.data.media.length)
                    setImagesUrl(res.data.media.map(x => { return { 'url': x.full_url, 'id': x.id, 'model_id': data.id } }));
                    setCurrentUpdated(res.data)
                }
            )
        }

    }, [data, open])

    useEffect(() => {
        dispatch(InitDelteFiles())
    }, [])
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
                validationSchema={CaseSchema}
                initialValues={{ 'id':data.id, images: [] , 'description' :currentUpdated.description}}
                initialStatus={{ edit: true }}
                onSubmit={async (values) => {
                    setLoading(true)
                    console.log(values)
                    values['delete_files'] = deleteFiles
                    values['images'] = values['images'] != undefined ? values['images'].map(x => x.file_name).filter(function (el) {
                        return el != null;
                    }) : undefined;
                    CloseCase( {'id':data.id, 'images':values['images'], 'description':values['description'] }).then((result) => {
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
                            var temp =result.data;
                            dispatch(setNotificationData(
                                {
                                    message:t('close_case' ), title:t('close_case', { dynamicValue: t('case') }), type:'close_case' ,case_id: data.id
                                }
                            ))
                            dispatch(setDialogConfirmNotificationOpen(true))
                            temp['percentage_completed']=data['percentage_completed'];
                            temp['total_needed_amount']=data['total_needed_amount']
                            temp['remaining_amount']=data['remaining_amount']
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
                                    CaseSchema.fields,
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
                            {<CloseCaseForm image_url={data.image_url} images_url={imagesUrl} />}
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
