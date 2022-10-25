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
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { useEffect } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'
import InputDescriptionDetail from '../../../../components/BlockDetail/InputDescriptionDetail';
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

export default function GeneralInfo({ ...props }) {
    const classes = useStyles();
    const { t } = useTranslation();
    const [images, setImages] = useState([]);
    const {lang} = useSelector(globalSelector)
    useEffect(() => {
        if (props.story.media)
            setImages(props.story?.media?.filter(x => x.collection_name == 'images_Success_stories').map(x => {
                return { 'original': x.full_url, 'thumbnail': x.full_url }
            }))

    }, [props.story])




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

                        <InputLabelDetail title={t('case_name')} value={props.story?.case?.name} />


                    </Grid>

                    <Grid container item md={6} sm={12}>

                        <InputLabelDetail title={t('views_count')} value={t(props.story?.views_count)} />


                    </Grid>


                    <Grid container item md={6} sm={12}>

                        <InputLabelDetail title={t('created_at')} value={ new Date(props.story?.created_at).toLocaleDateString(lang == 'ar' ? 'ar-EG' : 'en-US')} />


                    </Grid>


                    <Grid container item md={6} sm={12}>

                        <InputLabelDetail title={t('created_by')} value={props.story?.creator?.full_name} />


                    </Grid>
                    <Grid container item md={12} sm={12}>
                        <InputDescriptionDetail title={t('description')} value={props.story?.description} />
                    </Grid>

                    <Grid container item md={12} sm={12}>
                        <Box display="flex" style={{padding:'12px'}}>
                            <Box>
                                <InputLabel
                                    style={{
                                        color: 'black',
                                        width: 'auto',
                                    }}
                                >
                                    {t('cover_image')}
                                </InputLabel>
                            </Box>

                        </Box>

                        <Box>
                            <a download href={props.story?.media?.find(x => x.collection_name == 'Cover_Photo')?.download_url}>
                                <Image
                                    fluid
                                    style={{ width: '150px' }}
                                    src={props.story?.media?.find(x => x.collection_name == 'Cover_Photo')?.full_url}
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
                        <p className={classes.paperHeader}>{t('images')}</p>
                    </Grid>
                </Grid>
                <Grid container spacing={3} className={classes.grid}>
                    {images && images.length > 0 && (<ImageGallery items={images} style={{ maxHeight: '250px' }} />)}
                    {images && images.length == 0 && (<span>{t('no_images')}</span>)}
                </Grid>
            </Paper>

            <Paper elevation={5} className={classes.paper}>
                <Grid container>
                    <Grid container item xs={11}>
                        <p className={classes.paperHeader}>{t('vedio')}</p>
                    </Grid>
                </Grid>
                <Grid container spacing={3} className={classes.grid} style={{ justifyContent: 'center' }}>

                    {props.story?.vedio_url ? (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div>
                                <iframe width="420" height="345"
                                    src={props.story?.vedio_url != undefined ? props.story?.vedio_url.replace("watch?v=", "embed/") : ''}>
                                </iframe>
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <a href={props.story?.vedio_url} target={'_blank'}>{t('show_on_youtube')}</a>
                            </div>


                        </div>
                    ) : t('no_vedio')

                    }


                </Grid>
            </Paper>
        </div>
    );
}
