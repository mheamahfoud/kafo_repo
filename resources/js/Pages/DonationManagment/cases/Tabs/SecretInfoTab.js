import { Grid, makeStyles, Paper } from '@material-ui/core';
import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import {
    InputLabel,
    Box,
} from '@material-ui/core';
import InputLabelDetail from '../../../../components/BlockDetail/InputLabelDetail';
import EditSecretInfoDialog from '../../../../components/dialogs/caseManagment/SecretInfo/EditSecretInfo';
import { useTranslation } from 'react-i18next';
import { Player, ControlBar } from 'video-react';
import ShowYoutubeVedio from './ShowYoutubeVedio';
import { Image, Container, Row, Col } from "react-bootstrap";
import { mainColor } from '../../../../config/constants';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { useEffect } from 'react';
import { Button } from '@material-ui/core';
import InputDescriptionDetail from '../../../../components/BlockDetail/InputDescriptionDetail';
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

export default function SecretInfoTab({ ...props }) {
    const classes = useStyles();
    const { t } = useTranslation();
    const [secretInfo, setSecretInfo] = useState({});
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    useEffect(() => {
        if (props.case?.secret_info) {

            setSecretInfo(props.case?.secret_info)
        }

    }, [props.case])

    useEffect(() => {
        if (props.case?.secret_info) {

            setSecretInfo(props.case?.secret_info)
        }

    }, [props.case])
    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    }
    return (
        <div>
            <Paper elevation={5} className={classes.paper}>
                <Grid container>
                    <Grid container item xs={12} style={{ justifyContent: 'flex-end' }}>
                        <Button
                            component="span"
                            variant="contained"
                            onClick={() => { setEditDialogOpen(true) }}
                            fullWidth
                            style={{
                                color: '#fff',
                                backgroundColor: ' #1976d2',
                                width: '5%'
                            }}
                        >
                            {t('edit')}

                        </Button>


                    </Grid>
                </Grid>
                <Grid container spacing={3} className={classes.grid}>
                    <Grid container item md={6} sm={12}>
                        <InputLabelDetail title={t('person_name')} value={secretInfo?.person_name} />
                    </Grid>

                    <Grid container item md={6} sm={12}>
                        <InputLabelDetail title={t('relation_name')} value={secretInfo?.relation_name} />
                    </Grid>

                    <Grid container item md={6} sm={12}>
                        <InputLabelDetail title={t('relation')} value={secretInfo?.relation?.name} />
                    </Grid>

                    <Grid container item md={6} sm={12}>
                        <InputLabelDetail title={t('phone_number')} value={secretInfo?.phone_number} />
                    </Grid>

                    <Grid container item md={6} sm={12}>
                        <InputLabelDetail title={t('provider_name')} value={secretInfo?.provider?.name} />
                    </Grid>

                    <Grid container item md={6} sm={12}>
                        <Box display="flex">
                            <Box>
                                <InputLabel
                                    style={{
                                        color: 'black',
                                        width: 'auto',
                                    }}
                                >
                                    {t('provider_image')}
                                </InputLabel>
                            </Box>

                        </Box>

                        {secretInfo?.provider?.media?.find(x => x.collection_name == 'provider') &&
                            (<Box>
                                <a download href={secretInfo.provider?.media?.find(x => x.collection_name == 'provider')?.download_url}>
                                    <Image
                                        fluid
                                        style={{ width: '150px' }}
                                        src={secretInfo?.provider?.media?.find(x => x.collection_name == 'provider')?.full_url}
                                        thumbnail
                                    />
                                </a>

                            </Box>)
                        }
                        {!secretInfo?.provider?.media?.find(x => x.collection_name == 'provider') &&
                            (<Box>
                                {t('no_images')}

                            </Box>)
                        }
                    </Grid>
                    <Grid container item md={12} sm={12}>
                        <InputDescriptionDetail title={t('address')} value={secretInfo?.address} />
                    </Grid>
                    <Grid container item md={12} sm={12}>
                        <InputDescriptionDetail title={t('note')} value={secretInfo?.note} />
                    </Grid>


                </Grid>
            </Paper>

            {editDialogOpen && (
                <EditSecretInfoDialog
                    open={editDialogOpen}
                    onClose={handleEditDialogClose}
                    case_id={props?.case?.id}
                    data={secretInfo}
                    setSecretInfo={setSecretInfo}
                />
            )}

        </div>
    );
}
