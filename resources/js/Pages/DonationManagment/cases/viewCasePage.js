import * as React from 'react';
import { useState, useEffect } from 'react';
import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid ,Box} from '@material-ui/core';
import TabWrapper from '../../../components/tabs/TabWrapper';
const CustomAppBar = lazy(() => import('../../../components/tabs/CustomAppBar'));
import { makeStyles } from '@material-ui/core/styles';
import { ShowCase } from '../../../api/caseManager/case'
import GeneralInfo from './Tabs/GeneralInfo';
import { useLocation } from 'react-router-dom'
import CostTab from './Tabs/CostTab';
import ValidationTab from './Tabs/ValidationTab';
import DonorsTab from './Tabs/DonorsTab';
import SecretInfoTab from './Tabs/SecretInfoTab';
import FollowersTab from './Tabs/FollowersTab';
import UpdatesTab from './Tabs/UpdatesTab';
import { CircularProgress } from '@mui/material';
import { mainColor } from '../../../config/constants';
import LoadingPage from '../../../components/progressLoading/LoadingPage';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    Inercircle: {
        backgroundColor: '#fff',
        border: '6px solid #9BC9CB',
        borderRadius: '50%',
        width: '100%',
        textAlign: 'center',
        margin: 'auto',
        height: '100%',
    },
    '@global': {
        '.MuiAppBar-colorPrimary': {
            color: '#ffff',
            backgroundColor: '#005697'
        },
        '.MuiChip-root': {
            backgroundColor: '#0e8e93',
            color: '#fff',
        },
        '.MuiChip-deleteIcon': {
            color: 'rgb(255 255 255)',
        },
    },
}));
export default function viewCasePage() {
    const { t } = useTranslation();
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [currentData, setCurrentData] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const currentLocation = useLocation().state
    useEffect(() => {

        if (currentLocation.id != undefined) {
            ShowCase({ 'id': currentLocation.id }).then(
                (res) => {
                    console.log(res.data)
                    setCurrentData(res.data)
                    setLoading(false)
                    // setImagesUrl(res.data.media.map(x => { return { 'url': x.full_url, 'id': x.id, 'model_id': data.id } }));
                    // setCurrentUpdated(res.data)
                }
            )
        }

    }, [currentLocation])
    const tabLabels = [

        t('general_info'),
        t('costs'),
        t('validations'),
        t('donors'),
        t('secret_info'),
        t('followers'),
        t('updates'),



    ];

    return loading ? 
      <LoadingPage/>
    : (
        <React.Fragment>

            <Grid container>
                <Grid item xs={12} style={{ paddingRight: '12px' }}>
                    <CustomAppBar
                        labels={tabLabels}
                        setSelectedTab={setSelectedTab}
                    />
                    <TabWrapper
                        index={0}
                        selectedTab={selectedTab}
                    >
                        <GeneralInfo case={currentData} />
                    </TabWrapper>
                    <TabWrapper
                        index={1}
                        selectedTab={selectedTab}
                    >
                        <CostTab case={currentData} />
                    </TabWrapper>

                    <TabWrapper
                        index={2}
                        selectedTab={selectedTab}
                    >
                        <ValidationTab case={currentData} />
                    </TabWrapper>
                    <TabWrapper
                        index={3}
                        selectedTab={selectedTab}
                    >
                        <DonorsTab case={currentData} />
                    </TabWrapper>

                    <TabWrapper
                        index={4}
                        selectedTab={selectedTab}
                    >
                        <SecretInfoTab case={currentData} />
                    </TabWrapper>

                    <TabWrapper
                        index={5}
                        selectedTab={selectedTab}
                    >
                        <FollowersTab case={currentData} />
                    </TabWrapper>

                    <TabWrapper
                        index={6}
                        selectedTab={selectedTab}
                    >
                        <UpdatesTab case={currentData} />

                    </TabWrapper>
                </Grid>
            </Grid>
        </React.Fragment>

    );
}
