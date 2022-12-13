import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Grid, Paper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { globalSelector } from '../../redux/features/global_slice';
import { mainColor } from '../../config/constants';
import DataTable from '../../components/table/DataTable';
import { GetNotifications } from '../../api/services/notification';
import GeneralStyles from '../../components/styles/GeneralStyles';
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
const NotificationPage = ({ ...props }) => {
    const { t } = useTranslation();
    const { dialog_confirm_data } = useSelector(globalSelector);
    const dispatch = useDispatch();
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const { lang } = useSelector(globalSelector)
    const columns = React.useMemo(
        () => [
            {
                field: 'id',
                headerName: t('id'),
                width: 60,
                type: "number",
                headerAlign: 'center',
            },
            {
                field: 'receiver',
                headerName: t('receiver'),
                type: "text",
                headerAlign: 'center',
            },
            {
                field: 'title',
                headerName: t('title'),
                flex: 1,
                headerAlign: 'center',
            },
            {
                field: 'body',
                headerName: t('body'),
                flex: 1,
                headerAlign: 'center',
            },
            {
                field: 'created_at',
                headerName: t('created_at'),
                type: 'dateTime',
                valueFormatter: params =>
                    new Date(params?.value).toLocaleDateString(lang == 'ar' ? 'ar-EG' : 'en-US'),
                flex: 1,

            },



        ]
    );

    useEffect(() => {
        GetNotifications().then((res) => {
            if (res.success) {
                setRows(res.data)
                setLoading(false);
            }
        }
        )
    }, [])

    return (
        <React.Fragment>

            <Paper className={GeneralStyles.paperhearder} elevation={5}>
                <DataTable rows={rows} columns={columns} setAddDialogOpen={undefined} loading={loading} disableVirtualization={true} type={'notifications'} case_id={props.case?.id} />


            </Paper>
        </React.Fragment>

    );
}

export default NotificationPage
