import React, { useEffect, useState } from 'react'
import FormikInputLabel from '../../components/Formik/FormikInputLabel';
import FormikInputTextArea from '../../components/Formik/FormikInputTextArea';
import FormikMultiSelect from '../../components/Formik/FormikMultiSelect';
import { Button, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Grid, Paper } from '@material-ui/core';
import { sendSpecificNotification } from '../../api/services/notification';
import { useSelector, useDispatch } from 'react-redux';
import { globalSelector } from '../../redux/features/global_slice';
import { mainColor } from '../../config/constants';
import { GetDonorList } from '../../api/userManagment/donor';
import { useSnackbar } from "notistack";
import { useFormikContext } from 'formik';
import FormikSingleInputFile from '../../components/Formik/FormikSingleInputFile';
const useStyles = makeStyles((theme) => ({
    SubmitBtn: {
        backgroundColor: mainColor,
        color: 'white',
        borderRadius: 30,
        outline: 'none',
        fontSize: '12px',
        width: '10%',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'green',
        },
    },

    ResetBtn: {
        backgroundColor: '#900',
        color: 'white',
        borderRadius: 30,
        outline: 'none',
        fontSize: '12px',
        width: '10%',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'green',
        },
    },

}));
const PushNotificationPage = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { lang } = useSelector(globalSelector)
    const NotificationSchema = Yup.object().shape({
        title: Yup.string().required(t('required')),
        body: Yup.string().required(t('required')),
        users: Yup.string().required(t('required'))
    });
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = React.useState(false);
    const [users, setUsers] = useState([]);
   //  const { setFieldValue } = useFormikContext();

    useEffect(() => {
        GetDonorList().then((res) => {
            setUsers(res.data)
        })
    }, [])

    const Reset = () => {
        // setFieldValue(  'users',null )
        // setFieldValue(  'title',null )
        // setFieldValue(  'body',null )



    }

    return (

        <div>
            <Formik
                enableReinitialize={true}
                validationSchema={NotificationSchema}
                initialValues={{}}
                initialStatus={{ edit: false }}
                onSubmit={async (values) => {
                    setLoading(true)
                    values['users_id'] = values['users'].split(',').map(x => parseInt(x))
                    sendSpecificNotification(values).then((result) => {
                        // alert(JSON.stringify(result.success))
                        if (result.success) {

                            enqueueSnackbar(t('sended_successfully'), {
                                variant: 'success',
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                },
                            });
                            setLoading(false)
                        } else {
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
                                    NotificationSchema.fields,
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

                        <Paper elevation={5} style={{ padding: '25px' }}>
                            <Grid container spacing={2}>
                                <Grid item md={12} sm={12}>
                                    <FormikMultiSelect
                                        name="users"
                                        isRequired={true}
                                        type="text"
                                        options={
                                            [{ text: 'Check all', value: 'check_all',mobile_number:' ' },
                                            ...users]
                                        }
                                        setFieldValue={setFieldValue}
                                        size="small"
                                        title={t('choose_user')}

                                    />


                                </Grid>

                                <Grid item md={12} sm={12}>

                                    <FormikInputLabel
                                        name="title"
                                        type="text"
                                        size="small"
                                        title={t('title')}
                                        isRequired={true}
                                    />



                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                    <FormikInputTextArea
                                        name="body"
                                        type="text"
                                        size="small"
                                        title={t('body')}
                                        isRequired={true}
                                    />
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>

                                    <FormikSingleInputFile
                                        name="image"
                                        isRequired={false}
                                        image_url={undefined}
                                        title={t('image')}
                                        setFieldValue={setFieldValue}
                                    />

                                </Grid>

                                <Grid item md={12} sm={12} style={{ padding: '5px' }}>
                                    <Button
                                        color="primary"
                                        className={classes.SubmitBtn}
                                        disabled={loading}
                                        type="submit"
                                        style={{
                                            float: lang == 'ar' ? 'left' : 'right',
                                            marginLeft: lang == 'ar' ? '-5px' : '5px',
                                            marginRight: lang == 'ar' ? '5px' : '-5px'
                                        }}
                                    >
                                        {/* {isSubmitting ? 'Loading' : status.edit ? t('update')  : t('create')} */}

                                        {loading ? t('loading') : t('send')}
                                    </Button>

                                </Grid>
                            </Grid>


                        </Paper>

                    </form>
                )}
            </Formik>



        </div>

    )
}

export default PushNotificationPage
