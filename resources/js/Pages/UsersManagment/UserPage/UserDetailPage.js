import * as React from 'react';
import { useState, useEffect } from 'react';
import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import TabWrapper from '../../../components/tabs/TabWrapper';
const CustomAppBar = lazy(() => import('../../../components/tabs/CustomAppBar'));
import { makeStyles } from '@material-ui/core/styles';
import DonationsTab from './Tabs/DonationsTab'
import GeneralInfoTab from './Tabs/GeneralInfoTab';
import { useLocation } from 'react-router-dom'
import { GetDonorDetails } from '../../../api/userManagment/donor';
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
        '.MuiChip-root': {
            backgroundColor: '#0e8e93',
            color: '#fff',
        },
        '.MuiChip-deleteIcon': {
            color: 'rgb(255 255 255)',
        },
    },
}));
export default function UserDetailPage() {
    const { t } = useTranslation();
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [currentData, setCurrentData] = React.useState({});
    const currentLocation = useLocation().state
    const [loading, setLoading] = React.useState(true);
    useEffect(() => {

        if (currentLocation.id != undefined) {
            GetDonorDetails({ 'id': currentLocation.id }).then(
                (res) => {
                    setLoading(false)
                    console.log(res.data)
                    setCurrentData(res.data)
                }
            )
        }

    }, [currentLocation])
    const tabLabels = [

        t('general_info'),
        t('donations'),




    ];

    return (
        loading ?
            <LoadingPage />
            :
            <React.Fragment>

                <Grid container>
                    <Grid item xs={12} style={{ paddingRight: '12px' }}>
                        <CustomAppBar
                            labels={tabLabels}
                            setSelectedTab={setSelectedTab}
                        />
                        {<TabWrapper
                            index={0}
                            selectedTab={selectedTab}
                        >
                            <GeneralInfoTab donor={currentData} />
                        </TabWrapper>}

                        {<TabWrapper
                            index={1}
                            selectedTab={selectedTab}
                        >
                            <DonationsTab donor={currentData} />
                        </TabWrapper>}

                    </Grid>
                </Grid>
            </React.Fragment>

    );
}
