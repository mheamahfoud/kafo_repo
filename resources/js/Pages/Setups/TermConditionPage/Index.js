import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Grid, Paper, Button } from '@material-ui/core';
import { mainColor } from '../../../config/constants';
import { useSelector, useDispatch } from 'react-redux';
import { GetTermCondition, UpdateTermCondition } from '../../../api/setUp/termCondition';
import { useSnackbar } from "notistack";
import RichTextEditor from "react-rte";
import LoadingPage from '../../../components/progressLoading/LoadingPage';
import { globalSelector } from '../../../redux/features/global_slice';
import MyStatefulEditor from "./rte_test";
import {
    InputLabel,
    Box,
    makeStyles,
} from '@material-ui/core';
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
const TermConditionPage = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [loadingPage, setLoadingPage] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [arValue, setArValue] = useState("");
    const [enValue, setEnValue] = useState("");
    const { lang } = useSelector(globalSelector)
    const { enqueueSnackbar } = useSnackbar();
    //  const { setFieldValue } = useFormikContext();
    const onChangeEn = (value) => {

        setEnValue(value);
    };
    const onChangeAr = (value) => {

        setArValue(value);
    };

    const save = () => {
        setLoading(true)
        console.log(arValue)
        console.log(enValue)
        UpdateTermCondition({ 'ar_description': arValue, 'en_description': enValue }).then((result) => {
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
                setLoading(false)
                enqueueSnackbar(result.error_description, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center',
                    },
                });
            }
        }

        )

    };
    useEffect(() => {
        setEnValue(enValue);
    }, [enValue])

    useEffect(() => {
        GetTermCondition().then((res) => {
            setLoadingPage(false)
            setArValue(res.data.ar_description.toString());
            setEnValue(res.data.en_description.toString());
        })
    }, [])

    return (
        <div>
            {
                loadingPage ?
                    <LoadingPage />
                    : (
                        <Paper elevation={5} style={{ padding: '25px' }}>
                            <Grid container spacing={2}>
                                <Grid item md={12} sm={12} xs={12}>
                                    <Button
                                        color="primary"
                                        className={classes.SubmitBtn}
                                        disabled={loading}
                                        onClick={save}
                                        style={{
                                            float: lang == 'ar' ? 'left' : 'right',
                                            marginLeft: lang == 'ar' ? '-5px' : '5px',
                                            marginRight: lang == 'ar' ? '5px' : '-5px'
                                        }}
                                    >
                                        {/* {isSubmitting ? 'Loading' : status.edit ? t('update')  : t('create')} */}

                                        {loading ? t('loading') : t('update')}
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item md={12} sm={12} xs={12}>
                                    <InputLabel
                                        style={{
                                            color: 'black',
                                            width: 'auto',
                                            paddingBottom: '15px'
                                        }}
                                    >
                                        {t('english')}
                                    </InputLabel>
                                    <MyStatefulEditor markup={enValue} onChange={onChangeEn} value={enValue} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item md={12} sm={12} xs={12}>
                                    <InputLabel
                                        style={{
                                            color: 'black',
                                            width: 'auto',
                                            paddingBottom: '15px'
                                        }}
                                    >
                                        {t('arabic')}
                                    </InputLabel>
                                    <MyStatefulEditor markup={arValue} onChange={onChangeAr} value={arValue} />
                                </Grid>
                            </Grid>
                        </Paper>
                    )
            }


        </div >

    )
}

export default TermConditionPage
