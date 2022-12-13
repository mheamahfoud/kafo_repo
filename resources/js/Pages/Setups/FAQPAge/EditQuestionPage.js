import React, { useEffect, useState } from 'react'
import { Button, makeStyles } from '@material-ui/core';
import ARFormikInputLabel from '../../../components/Formik/ARFormikInputLabel';
import FormikInputLabel from '../../../components/Formik/FormikInputLabel';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Grid, Paper, Box } from '@material-ui/core';
import { UpdateQuestion } from '../../../api/setUp/faq';
import { useSelector, useDispatch } from 'react-redux';
import { globalSelector } from '../../../redux/features/global_slice';
import { mainColor } from '../../../config/constants';
import { useSnackbar } from "notistack";
import CreateQuestionForm from './CreateQuestionForm';
import { useLocation } from 'react-router-dom'
import GeneralStyles from '../../../components/styles/GeneralStyles';
import { useNavigate } from "react-router-dom";
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
const EditQuestionPage = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { lang } = useSelector(globalSelector)
    const QuestionSchema = Yup.object().shape({
        ar_question: Yup.string().required(t('required')),
        en_question: Yup.string().required(t('required')),
    });
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = React.useState(false);
    const currentQuestion = useLocation().state.data;
    const question_id = useLocation().state.question_id;
    let navigate = useNavigate();
    return (

        <div>
            <Formik
                enableReinitialize={true}
                validationSchema={QuestionSchema}
                initialValues={currentQuestion}
                initialStatus={{ edit: true }}
                onSubmit={async (values) => {
                    setLoading(true)
                    UpdateQuestion(question_id, values).then((result) => {
                        if (result.success) {
                            enqueueSnackbar(t('updated_successfully'), {
                                variant: 'success',
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                },
                            });
                            setLoading(false)
                            navigate("/setup/faq", { state: {} });
                          
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
                                    QuestionSchema.fields,
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

                        <Paper elevation={5} className={GeneralStyles.paperhearder} style={{ padding: '25px' }}>

                            <Grid container spacing={2}>


                                <CreateQuestionForm />

                                <Grid item md={12} sm={12}>
                                    <Box>

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
                                            {loading ? t('loading') : t('send')}
                                        </Button>

                                    </Box>



                                </Grid>
                            </Grid>
                        </Paper>





                    </form>
                )}
            </Formik>



        </div>

    )
}

export default EditQuestionPage
