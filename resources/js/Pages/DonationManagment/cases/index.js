import * as React from 'react';
import { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import GeneralStyles from '../../../components/styles/GeneralStyles';
import { useTranslation } from 'react-i18next';
import { GridActionsCellItem } from '@mui/x-data-grid';
import AddCaseDialog from '../../../components/dialogs/caseManagment/AddCase';
import EditCaseDialog from '../../../components/dialogs/caseManagment/EditCase';
import { GetCases, PublishCase, CancelCase, CloseCase, ActivateDeactivateCase } from '../../../api/caseManager/case';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';
import moment from 'moment';
import AlertConfirmDialog from '../../../components/dialogs/alert/AlertConfirmDialog';
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from "notistack";
import "./style.css";
import PublishIcon from '@mui/icons-material/Publish';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import CancelCaseDialog from '../../../components/dialogs/caseManagment/cancelCase/CancelCase';
import ReportCancelCaseDialogn from '../../../components/dialogs/caseManagment/cancelCase/ReportCancelCaseDialogn';
import DataTable from '../../../components/table/DataTable';
import AddCloseCaseDialog from '../../../components/dialogs/caseManagment/closeCase/AddCloseCaseDialog';
import { globalSelector, setDialogConfirmData, setDialogConfirmOpen, setDialogReasonCaseId, setDialogReasonCaseOpen, setNotificationData, setDialogConfirmNotificationOpen, setNotificationIcon } from '../../../redux/features/global_slice';
import AlertConfirmNotificationDialog from '../../../components/dialogs/alert/AlertConfirmNotificationDialog';
import { sendPushNotification } from '../../../api/services/notification';
import { mainColor } from '../../../config/constants';
export default function CasePage() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);


    ///  const { notification_data, dialog_confirm_notification_open } = useSelector(notificationSelector)
    const { lang, dialog_confirm_data, dialog_reason_case_id, dialog_confirm_notification_open, notification_data, notification_icon } = useSelector(globalSelector);

    const dispatch = useDispatch()
    const handleShowDialog = () => {
        setIsOpen(current => !current);
    }
    const currencyFormatter = new Intl.NumberFormat(lang == 'ar' ? 'ar-EG' : 'en-US', {
        style: 'currency',
        currency: 'SYP',
    });

    const dateFormatter = (date) => new Date(date).toLocaleDateString(lang == 'ar' ? 'ar-EG' : 'en-US')


    const usdPrice = {
        type: 'number',
        width: 130,

        valueFormatter: ({ value }) => {
            if (lang == 'ar')
                return currencyFormatter.format(value)
            else {
                return (currencyFormatter.format(value).replace('SYP', '') + ' SYP')
            }
        },
        cellClassName: 'font-tabular-nums',
    };

    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [closeDialogOpen, setCloseDialogOpen] = React.useState(false);
    const [addRow, setAddRow] = React.useState(null);
    const [updateRow, setUpdateRow] = React.useState(null);
    const [data, setData] = React.useState(null);
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const { enqueueSnackbar } = useSnackbar();
    let navigate = useNavigate();

    const [reportCancelDialogOpen, setReportCancelDialogOpen] = React.useState(false);
    const event = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const columns = React.useMemo(
        () => [
            {
                field: 'id',
                headerName: t('id'),
                width: 60,
                type: "number",
                align: 'center',
                headerAlign: 'center',
            },
            {
                field: 'name',
                headerName: t('name'),
                align: 'center',
                flex: 1,
                headerAlign: 'center',
            },
            {
                field: 'cover_image',
                width: 100,
                // height: 200,
                headerName: t('cover_image'),
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
                field: 'status',
                align: 'center',
                headerName: t('status'),
                width: 100,
                valueOptions: ['draft', 'canceled', 'published', 'rejected', 'completed', 'closed'],
                type: 'singleSelect',
                headerAlign: 'center',
                renderCell: (params) => {
                    return t(params.row.status)
                }
            },
            {
                field: 'percentage_completed',
                headerName: t('percentage_completed'),
                flex: 1,
                align: 'center',
                cellClassName: 'font-tabular-nums',
                type: "number",
                headerAlign: 'center',
            },
            {
                field: 'total_needed_amount',
                headerName: t('total_needed_amount'),
                align: 'center',
                flex: 1,
                ...usdPrice,
                headerAlign: 'center',
            },
            {
                field: 'remaining_amount',
                headerName: t('remaining_amount'),
                align: 'center',
                flex: 1,
                ...usdPrice,
                headerAlign: 'center',
            },
            {
                field: 'created_at',
                align: 'center',
                headerName: t('created_at'),
                type: 'date',
                valueFormatter: params => {
                    return new Date(params?.value).toLocaleDateString(lang == 'ar' ? 'ar-EG' : 'en-US')
                },

                flex: 1, headerAlign: 'center',

            },
            {
                field: 'created_by',
                align: 'center',
                headerName: t('created_by'),
                type: 'text',
                flex: 1, headerAlign: 'center',

            },
            {
                field: 'actions',
                headerName: t('actions'),
                type: 'actions',
                width: 120,
                getActions: (params) => [
                    < GridActionsCellItem
                        hidden={['rejected', 'completed', 'closed', 'published'].includes(params.row.status)}
                        showInMenu={!['closed'].includes(params.row.status)}
                        icon={<PublishIcon style={{ fill: mainColor }} />}
                        label={t('publish_case')}
                        onClick={() => {

                            dispatch(setDialogConfirmOpen(true))
                            dispatch(setDialogConfirmData({ message: t('sure_publish'), title: t('publish_case'), id: params.row.id, action: 'publish' }))

                        }

                        }
                    />,

                    < GridActionsCellItem
                        showInMenu={!['closed'].includes(params.row.status)}
                        hidden={['closed', 'canceled'].includes(params.row.status)}
                        icon={<CancelIcon style={{ fill: mainColor }} />}
                        label={t('cancel_case')}
                        onClick={() => {
                            setData(params.row)
                            dispatch(setDialogConfirmOpen(true))
                            dispatch(setDialogConfirmData({ message: t('sure_cancel'), title: t('cancel_case'), id: params.row.id, action: 'cancel' }))


                        }
                        }
                    />,

                    < GridActionsCellItem
                        showInMenu={!['closed'].includes(params.row.status)}
                        icon={<CloseIcon style={{ fill: mainColor }} />}
                        hidden={!['completed'].includes(params.row.status)}
                        label={t('close_case')}
                        onClick={() => {
                            setData(params.row)
                            dispatch(setDialogConfirmOpen(true))
                            dispatch(setDialogConfirmData({ message: t('sure_close'), title: t('close_case'), id: params.row.id, action: 'close' }))

                        }

                        }
                    />,
                    < GridActionsCellItem
                        showInMenu
                        icon={params.row.is_active ? <RemoveIcon style={{ fill: mainColor }} /> : <CheckIcon style={{ fill: mainColor }} />}
                        label={params.row.is_active ? t('deactivate') : t('activate')}
                        onClick={() => {
                            dispatch(setDialogConfirmOpen(true))
                            dispatch(setDialogConfirmData({ message: params.row.is_active ? t('sure_inactivate') : t('sure_activate'), title: params.row.is_active ? t('deativate_case') : t('activate_case'), id: params.row.id, action: 'activateDeactivate' }))


                        }


                        }
                    />,

                    < GridActionsCellItem
                        icon={<InfoIcon style={{ fill: mainColor }} />}
                        label={t('detail')}
                        onClick={() => {
                            navigate("/Donation/case/view", { state: { 'name': params.row.name, 'id': params.row.id } });
                        }

                        }
                    />,

                    <GridActionsCellItem
                        icon={< EditIcon style={{ fill: mainColor }} />}
                        label={t('update')}
                        onClick={() => {
                            setData(params.row)
                            setEditDialogOpen(true);
                        }}
                    />,




                ],
            },
        ]
    );
    useEffect(() => {
        GetCases().then((res) => {
            setRows(res.data.data);
            setLoading(false);
        })
    }, [])
    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    }
    const handleDialogClose = () => {
        setAddDialogOpen(false);
    }
    const handleCancelDialogClose = () => {
        setReportCancelDialogOpen(false);
    }
    const handleCloseDialogClose = () => {
        setCloseDialogOpen(false);
    }

    React.useEffect(() => {
        if (addRow != null) {
            setRows([...rows, addRow]);
        }
    }, [addRow])
    useEffect(() => {
        if (updateRow != null) {
            var index = rows.findIndex(x => x.id == updateRow.id);
            setRows([
                ...rows.slice(0, index),
                updateRow,
                ...rows.slice(index + 1, rows.length)]);
        }
    }, [updateRow])
    const handleCancelDialogYes = () => {
        alert(777)
        setReportCancelDialogOpen(true)
    }





    const handleDialogYes = () => {

        if (dialog_confirm_data.action == 'publish') {
            PublishCase({ 'id': dialog_confirm_data.id }).then(
                (res) => {
                    if (res.success) {
                        var index = rows.findIndex(x => x.id == dialog_confirm_data.id);
                        var temp = rows.find(x => x.id == dialog_confirm_data.id);
                        temp['status'] = 'published'
                        setRows([
                            ...rows.slice(0, index),
                            temp,
                            ...rows.slice(index + 1, rows.length)]);
                        dispatch(setDialogConfirmOpen(false))
                        dispatch(setDialogConfirmData({ message: '', title: '', id: null, action: '' }))


                        dispatch(setNotificationData(
                            {
                                message: t('publish_case'), title: t('publish_case', { dynamicValue: t('case') }), type: 'publish_case', case_id: dialog_confirm_data.id
                            }
                        ))
                        dispatch(setDialogConfirmNotificationOpen(true))
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
        }
        else if (dialog_confirm_data.action == 'cancel') {

            dispatch(setDialogReasonCaseId(dialog_confirm_data.id))
            dispatch(setDialogReasonCaseOpen(true))
        }
        else if (dialog_confirm_data.action == 'activateDeactivate') {

            ActivateDeactivateCase({ 'id': dialog_confirm_data.id }).then(
                (res) => {
                    if (res.success) {
                        var index = rows.findIndex(x => x.id == dialog_confirm_data.id);
                        var temp = rows.find(x => x.id == dialog_confirm_data.id);
                        temp['is_active'] = !temp['is_active'];
                        setRows([
                            ...rows.slice(0, index),
                            temp,
                            ...rows.slice(index + 1, rows.length)]);

                        dispatch(setDialogConfirmOpen(false))
                        dispatch(setDialogConfirmData({ message: '', title: '', id: null, action: '' }))


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

        }
        else if (dialog_confirm_data.action == 'close') {
            dispatch(setDialogConfirmOpen(false))
            dispatch(setDialogConfirmData({ message: '', title: '', id: null, action: '' }))
            setCloseDialogOpen(true);

        }


    };

    const handleDialogNotificationYes = () => {

        setLoading(true)
        sendPushNotification({ 'case_id': notification_data.case_id, 'type': notification_data.type, 'image': notification_icon }).then(
            (res) => {
                if (!res.error_code) {
                    setLoading(false)
                    dispatch(setNotificationIcon(undefined))
                    dispatch(setDialogConfirmNotificationOpen(false))
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
    return (<React.Fragment>
        <Paper className={GeneralStyles.paperhearder} elevation={5} >
            <DataTable rows={rows} columns={columns} setAddDialogOpen={setAddDialogOpen} loading={loading} type={'cases'} />
            {(<AddCaseDialog
                open={addDialogOpen}
                onClose={handleDialogClose}
                setAddRow={setAddRow}

            />)}

            {editDialogOpen && (
                <EditCaseDialog
                    open={editDialogOpen}
                    onClose={handleEditDialogClose}
                    data={data}
                    setUpdateRow={setUpdateRow}
                />
            )}

            <AlertConfirmDialog
                title={dialog_confirm_data.title}
                message={dialog_confirm_data.message}
                callBack={handleDialogYes}
            />


            <AlertConfirmNotificationDialog
                loading={loading}
                title={notification_data.title}
                message={notification_data.message}
                callBack={handleDialogNotificationYes}


            />



            <CancelCaseDialog

                setReportCancelDialogOpen={setReportCancelDialogOpen}
            />

            {reportCancelDialogOpen && (
                <ReportCancelCaseDialogn
                    open={reportCancelDialogOpen}
                    onClose={handleCancelDialogClose}
                    case_id={dialog_reason_case_id}
                    data={data}
                    setUpdateRow={setUpdateRow}

                />
            )}
            {closeDialogOpen && (
                <AddCloseCaseDialog
                    open={closeDialogOpen}
                    onClose={handleCloseDialogClose}
                    data={data}
                    setUpdateRow={setUpdateRow}

                />
            )}


        </Paper>
    </React.Fragment>

    );
}
