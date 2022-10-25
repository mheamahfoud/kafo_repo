import * as React from 'react';
import { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import GeneralStyles from '../../../../components/styles/GeneralStyles';

import { useTranslation } from 'react-i18next';
import AddUpdateDialog from '../../../../components/dialogs/caseManagment/updates/AddUpdate';
import EditUpdateDialog from '../../../../components/dialogs/caseManagment/updates/EditUpdate';
import { GetUpdatesCase, ActivateDeactivateCaseUpdate } from '../../../../api/caseManager/case';
import { useSelector, useDispatch } from 'react-redux'
import { Image, Container, Row, Col } from "react-bootstrap";
import { useSnackbar } from "notistack";
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import DataTable from '../../../../components/table/DataTable';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';
import AlertConfirmUpdateDialog from '../../../../components/dialogs/alert/AlertConfirmUpdateDialog';
import { GridActionsCellItem } from '@mui/x-data-grid';
import "./style.css";
import { globalSelector, setDialogConfirmUpdateData, setDialogConfirmUpdateOpen, setNotificationData, setDialogConfirmNotificationOpen, setNotificationIcon } from '../../../../redux/features/global_slice';
import AlertConfirmNotificationDialog from '../../../../components/dialogs/alert/AlertConfirmNotificationDialog';
import { sendPushNotification } from '../../../../api/services/notification';
import { mainColor } from '../../../../config/constants'
    ;
export default function UpdatesTab({ ...props }) {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [addRow, setAddRow] = React.useState(null);
    const [updateRow, setUpdateRow] = React.useState(null);
    const [data, setData] = React.useState(null);
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const { lang, dialog_confirm_update_data, dialog_confirm_update_open, dialog_confirm_notification_open, notification_data, notification_icon } = useSelector(globalSelector)

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
                field: 'description',
                headerName: t('description'),
                flex: 1, headerAlign: 'center',

            },
            {
                field: 'image',
                width: 120,
                headerName: t('image'),
                headerAlign: 'center',
                renderCell: (params) => {
                    // return params.row.image_url
                    return (
                        <a href={params.row.download_url} download >
                            <Image
                                fluid
                                src={params.row.image_url}
                                thumbnail

                            />
                        </a>
                    )
                }

            },
            {
                field: 'created_at',
                headerName: t('created_at'),
                type: 'date',
                valueFormatter: params =>
                    new Date(params?.value).toLocaleDateString(lang == 'ar' ? 'ar-EG' : 'en-US'),
                flex: 1, headerAlign: 'center',

            },
            {
                field: 'views_count',
                headerName: t('views_count'),
                flex: 1,
                align: 'center',
                cellClassName: 'font-tabular-nums',
                type: "number",
                headerAlign: 'center',
            },
            {
                field: 'created_by',
                headerName: t('created_by'),
                type: 'text',
                flex: 1, headerAlign: 'center',

            },
            {
                field: 'actions',
                headerName: t('actions'),
                type: 'actions',
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<EditIcon style={{ fill: mainColor }} />}
                        label={t('update')}
                        onClick={() => {
                            setData(params.row)
                            setEditDialogOpen(true);
                        }}
                    />,
                    <GridActionsCellItem
                        icon={params.row.is_active ? <RemoveIcon color='success' /> : <CheckIcon color='success' />}
                        label={params.row.is_active ? t('deactivate') : t('activate')}
                        onClick={() => {
                            dispatch(setDialogConfirmUpdateOpen(true))
                            dispatch(setDialogConfirmUpdateData({ is_active: params.row.is_active, id: params.row.id }))

                        }

                        }
                    />,
                ],
            },
        ]
    );

    useEffect(() => {
        if (props.case?.id) {

            GetUpdatesCase({ 'case_id': props.case.id }).then(
                (res) => {
                    if (res.success) {
                        setRows(res.data.data);
                        setLoading(false);
                    }
                }
            )

        }


    }, [props.case])
    const handleDialogClose = () => {
        setAddDialogOpen(false);
    }
    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    }
    React.useEffect(() => {
        if (addRow != null) {
            setRows([...rows, addRow]);
        }
    }, [addRow]);

    useEffect(() => {
        if (updateRow != null) {
            var index = rows.findIndex(x => x.id == updateRow.id);
            setRows([
                ...rows.slice(0, index),
                updateRow,
                ...rows.slice(index + 1, rows.length)]);
        }
    }, [updateRow])
    const handleActivateDialogYes = () => {
        ActivateDeactivateCaseUpdate({ 'id': dialog_confirm_update_data.id }).then(
            (res) => {
                if (res.success) {
                    var index = rows.findIndex(x => x.id == dialog_confirm_update_data.id);
                    var temp = rows.find(x => x.id == dialog_confirm_update_data.id);
                    temp['is_active'] = !temp['is_active'];
                    setRows([
                        ...rows.slice(0, index),
                        temp,
                        ...rows.slice(index + 1, rows.length)]);
                    dispatch(setDialogConfirmUpdateOpen(false))
                    dispatch(setDialogConfirmUpdateData({ is_active: 0, id: null }))


                    enqueueSnackbar(t('updated_successfully'), {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center',
                        },
                    });
                }
                else {
                    enqueueSnackbar(res.error_description, {
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

    const handleDialogNotificationYes = () => {
        setLoading(true)
        sendPushNotification({ 'case_id': notification_data.case_id, 'type': notification_data.type, 'image': notification_icon }).then(
            (res) => {
                if (!res.error_code) {
                    setLoading(false)
                    dispatch(setDialogConfirmNotificationOpen(false))
                    setNotificationIcon(undefined)
                    enqueueSnackbar(t('sended_successfully'), {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center',
                        },
                    });
                }
                else {
                    setLoading(false)
                    enqueueSnackbar(res.error_description, {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center',
                        },
                    });
                }
            }
        )

    }
    return (
        <React.Fragment>

            <Paper className={GeneralStyles.paperhearder} elevation={5}>
                <DataTable rows={rows} columns={columns} setAddDialogOpen={setAddDialogOpen} loading={loading} disableVirtualization={true} type={'case_updates'} case_id={props.case?.id} />
                <AddUpdateDialog
                    open={addDialogOpen}
                    is_published={props.case.is_published}
                    case_id={props.case?.id}
                    onClose={handleDialogClose}
                    setAddRow={setAddRow}

                />



                {(
                    <EditUpdateDialog
                        open={editDialogOpen}
                        onClose={handleEditDialogClose}
                        data={data}
                        is_published={props.case.is_published}
                        setUpdateRow={setUpdateRow}
                    />
                )}
                <AlertConfirmUpdateDialog
                    title={''}
                    message={dialog_confirm_update_data.is_active ? t('sure_inactivate') : t('sure_activate')}
                    callBack={handleActivateDialogYes}
                />
                {props.case.is_published && (
                    <AlertConfirmNotificationDialog
                        title={notification_data.title}
                        loading={loading}
                        message={notification_data.message}
                        callBack={handleDialogNotificationYes}


                    />
                )}


            </Paper>
        </React.Fragment>

    );
}
