import { Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import {
    InputLabel,
    Box,
} from '@material-ui/core';
import InputLabelDetail from '../../../../components/BlockDetail/InputLabelDetail';
import { useTranslation } from 'react-i18next';
import { Image } from "react-bootstrap";
import { mainColor } from '../../../../config/constants';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import InputAmountDetails from '../../../../components/BlockDetail/InputAmountDetails';
import { globalSelector } from '../../../../redux/features/global_slice';

const useStyles = makeStyles((theme) => ({
    paper: {
        height: 'auto',
        width: '100%',
    },
    grid: {
        padding: '24px',
        marginBottom: '10px',
    },
    paperHeader: {
        backgroundColor: mainColor,
        color: '#fff',
        fontWeight: 'bold',
        padding: '2px',
        paddingTop: '1px',
        textAlign: 'center',
        width: '15%',
        minWidth: '220px',
    },
}));

export default function GeneralInfoTab({ ...props }) {
    const classes = useStyles();
    const { t } = useTranslation();
    const {lang} = useSelector(globalSelector)





    return (
        <div>
            <Paper elevation={5} className={classes.paper}>
                <Grid container>
                    <Grid container item xs={11}>
                        <p className={classes.paperHeader}>{t('general')}</p>
                    </Grid>
                </Grid>
                <Grid container spacing={3} className={classes.grid}>

                    <Grid container item md={6} sm={12}>
                        <InputLabelDetail title={t('id')} value={props.donor?.id} />
                    </Grid>


                    <Grid container item md={6} sm={12}>
                        <InputLabelDetail title={t('full_name')} value={props.donor?.user?.full_name} />
                    </Grid>

                    <Grid container item md={6} sm={12}>

                        <InputLabelDetail title={t('secret_name')} value={t(props.donor?.secret_name)} />


                    </Grid>






                    <Grid container item md={6} sm={12}>

                        <InputLabelDetail title={t('phone_number')} value={props.donor?.user?.mobile} />


                    </Grid>


                    <Grid container item md={6} sm={12}>

                        <InputLabelDetail title={t('gender')} value={t(props.donor?.gender)} />


                    </Grid>
                    <Grid container item md={6} sm={12}>
                        <InputLabelDetail title={t('created_at')} value={new Date(props.donor?.created_at).toLocaleDateString(lang == 'ar' ? 'ar-EG' : 'en-US')} />
                    </Grid>


                    <Grid container item md={6} sm={12}>

                        <InputLabelDetail title={t('status')} value={props.donor?.user?.is_active ? t('inactive') : t('active')} />


                    </Grid>
                    <Grid container item md={6} sm={12}>
                        <InputLabelDetail title={t('birth_date')} value={new Date(props.donor?.birth_date).toLocaleDateString(lang == 'ar' ? 'ar-EG' : 'en-US')} />
                    </Grid>
                    <Grid container item md={6} sm={12}>
                        <InputLabelDetail title={t('email')} value={props.donor?.user?.email} />
                    </Grid>


                    <Grid container item md={6} sm={12}>
                        <Box display="flex" style={{ padding: '12px' }}>
                            <Box>
                                <InputLabel
                                    style={{
                                        color: 'black',
                                        width: 'auto',
                                    }}
                                >
                                    {t('image')}
                                </InputLabel>
                            </Box>

                        </Box>

                        <Box>
                            <a download href={props.donor?.media?.find(x => x.collection_name == 'Donors')?.download_url}>
                                <Image
                                    fluid
                                    style={{ width: '150px' }}
                                    src={props.donor?.media?.find(x => x.collection_name == 'Donors')?.full_url}
                                    thumbnail
                                />
                            </a>

                        </Box>

                    </Grid>

                </Grid>
            </Paper>






            <Paper elevation={5} className={classes.paper}>
                <Grid container>
                    <Grid container item xs={11}>
                        <p className={classes.paperHeader}>{t('wallet')}</p>
                    </Grid>
                </Grid>
                <Grid container spacing={3} className={classes.grid}>
                    <Grid container item md={6} sm={12}>
                        <InputAmountDetails title={t('total_amount')} value={props.donor?.wallet?.amount} />



                    </Grid>
                    <Grid container item md={6} sm={12}>
                        <InputAmountDetails title={t('last_charge_amount')} value={props.donor?.wallet?.last_charge_amount} />

                    </Grid>
                    <Grid container item md={6} sm={12}>
                        <InputLabelDetail title={t('last_charge_date')} value={new Date(props.donor?.wallet?.last_charge_date).toLocaleDateString(lang == 'ar' ? 'ar-EG' : 'en-US') + ' ' + new Date(props.donor?.wallet?.last_charge_date).toLocaleTimeString(lang == 'ar' ? 'ar-EG' : 'en-US')} />

                    </Grid>

                    <Grid container item md={6} sm={12}>
                        <InputLabelDetail title={t('charge_count')} value={props.donor?.wallet?.charge_count} />
                    </Grid>






                </Grid>
            </Paper>

        </div>
    );
}
