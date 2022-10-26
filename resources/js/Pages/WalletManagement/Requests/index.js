import * as React from 'react';
import { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import GeneralStyles from '../../../components/styles/GeneralStyles';
import { useTranslation } from 'react-i18next';
import { GridActionsCellItem } from '@mui/x-data-grid';
import AddAdmin from '../../../components/dialogs/userManagment/admins/AddAdmin';
import EditAdmin from '../../../components/dialogs/userManagment/admins/EditAdmin';
import { GetRequests } from '../../../api/userManagment/request';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';
import moment from 'moment';
import AlertConfirmDialog from '../../../components/dialogs/alert/AlertConfirmDialog';
import { useSelector, useDispatch } from 'react-redux'
import { ActivateDeactivateAdmin } from '../../../api/userManagment/admin';
import { RejectRequest } from '../../../api/userManagment/request';
import DataTable from '../../../components/table/DataTable';
import { useSnackbar } from "notistack";
import AcceptRequestDialog from '../../../components/dialogs/requests/AcceptRequestDialog';
import { globalSelector } from '../../../redux/features/global_slice';
import { setDialogConfirmOpen, setDialogConfirmData } from '../../../redux/features/global_slice';
import { mainColor } from '../../../config/constants';
import ModalImage from "react-modal-image-responsive";
export default function RequestPage() {
    const { t } = useTranslation();
    const {lang,dialog_confirm_data} = useSelector(globalSelector)
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const [acceptDialogOpen, setAcceptDialogOpen] = React.useState(false);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [addRow, setAddRow] = React.useState(null);
    const [updateRow, setUpdateRow] = React.useState(null);
    const [data, setData] = React.useState(null);
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const currencyFormatter = new Intl.NumberFormat(lang == 'ar' ? 'ar-EG' : 'en-US', {
        style: 'currency',
        currency: 'SYP',
    });
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
    const columns = React.useMemo(
        () => [
            {
                field: 'id',
                headerName: t('id'),
                width: 80,
                type: "number",
                headerAlign: 'center',
            },
            {
                field: 'requester_name',
                headerName: t('requester_name'),
                flex: 1, headerAlign: 'center',

            },

            {
                field: 'image_path',
                width: 100,
                align: 'center',
                // height: 200,
                headerName: t('image'),
                headerAlign: 'center',
                renderCell: (params) => {
                    // return params.row.image_url
                    return (
                        <>

                            <ModalImage
                                className="img-fluid"
                                small={params.row.image_path}
                                large={params.row.image_path}
                            />
                        </>
                    )
                }

            },
            {
                field: 'requester_phone_number',
                align: 'center',
                headerName: t('phone_number'),
                type: 'number',
                flex: 1, headerAlign: 'center',

            },
            {
                field: 'amount',
                headerName: t('amount'),
                align: 'center',
                flex: 1,
                ...usdPrice,
                headerAlign: 'center',
            },

            {
                field: 'created_at',
                headerName: t('request_date_time'),
                type: 'date',
                valueFormatter: params =>
                    moment(params?.value).format('YYYY-MM-DD HH:mm:ss'),
                flex: 1, headerAlign: 'center',

            },

            {
                field: 'status',
                headerName: t('status'),
                valueOptions: ['pending', 'rejected', 'accepted'],
                type: 'singleSelect',
                flex: 1, headerAlign: 'center',
                renderCell: (params) => {
                    return t(params.row.status)
                }
            },

            {
                field: 'actions',
                headerName: t('actions'),
                type: 'actions',
                width: 80,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<CheckIcon style={{fill:mainColor}}  />}
                        label={t('accept')}
                        hidden={!['pending'].includes(params.row.status)}
                        onClick={() => {
                            setData(params.row);
                            dispatch(setDialogConfirmOpen(true))
                            dispatch(setDialogConfirmData({  message: t('sure_accept'), title: t('accept_request'), id: params.row.id, action: 'accept'  }))

                         
                        }

                        }
                    />,
                    <GridActionsCellItem
                        icon={<RemoveIcon style={{fill:mainColor}}  />}
                        hidden={!['pending'].includes(params.row.status)}
                        label={t('reject')}
                        onClick={() => {
                            dispatch(setDialogConfirmOpen(true))
                            dispatch(setDialogConfirmData({ message: t('sure_reject'), title: t('reject_request'), id: params.row.id, action: 'reject' }))

                        }

                        }
                    />,
                ],
            },
        ]
    );

    useEffect(() => {
        GetRequests().then((res) => {
            if (res.success) {
                setRows(res.data.data);
                setLoading(false);
            }
            else {
                setLoading(false);
                notify(res.error_description)
            }

        })
    }, [])
    const handleAcceptDialogClose = () => {
        setAcceptDialogOpen(false);
    }
    const handleDialogClose = () => {
        setAddDialogOpen(false);
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

    const handleActivateDialogYes = () => {
        setLoading(true)
        ActivateDeactivateAdmin({ 'id': dialog_confirm_data.id }).then(
            (res) => {
                setLoading(false)
                var index = rows.findIndex(x => x.id == dialog_confirm_data.id);
                setRows([
                    ...rows.slice(0, index),
                    res.data,
                    ...rows.slice(index + 1, rows.length)]);
                dispatch({ type: 'set', dialog_confirm_open: false })
                dispatch({ type: 'set', dialog_confirm_data: { is_active: 0, id: null } })

            }
        )

    };
    const handleDialogYes = () => {
        
        if (dialog_confirm_data.action == 'accept') {
            
            dispatch(setDialogConfirmOpen(false))
            dispatch(setDialogConfirmData({ message: '', title: '', id: null, action: '' } ))

            setAcceptDialogOpen(true)
            // PublishCase({ 'id': dialog_confirm_data.id }).then(
            //     (res) => {
            //         if (res.success) {
            //             var index = rows.findIndex(x => x.id == dialog_confirm_data.id);
            //             var temp = rows.find(x => x.id == dialog_confirm_data.id);
            //             temp['status'] = 'published'
            //             setRows([
            //                 ...rows.slice(0, index),
            //                 temp,
            //                 ...rows.slice(index + 1, rows.length)]);
            //             dispatch({ type: 'set', dialog_confirm_open: false })
            //             dispatch({ type: 'set', dialog_confirm_data: { message: '', title: '', id: null, action: '' } })
            //             enqueueSnackbar(t('updated_successfully'), {
            //                 variant: 'success',
            //                 anchorOrigin: {
            //                     vertical: 'bottom',
            //                     horizontal: 'center',
            //                 },
            //             });
            //         }
            //         else {
            //             enqueueSnackbar(res.error_description, {
            //                 variant: 'error',
            //                 anchorOrigin: {
            //                     vertical: 'bottom',
            //                     horizontal: 'center',
            //                 },
            //             });
            //         }


            //     }
            // )
        }
        else if (dialog_confirm_data.action == 'reject') {
            RejectRequest({ 'id': dialog_confirm_data.id }).then(
                (res) => {
                    if (res.success) {
                        var index = rows.findIndex(x => x.id == dialog_confirm_data.id);
                        var temp = rows.find(x => x.id == dialog_confirm_data.id);
                        temp['status'] = 'rejected'
                        setRows([
                            ...rows.slice(0, index),
                            temp,
                            ...rows.slice(index + 1, rows.length)]);
                            setDialogConfirmData
                            dispatch(setDialogConfirmOpen(false))
                            dispatch(setDialogConfirmData({ type: 'set', dialog_confirm_data: { message: '', title: '', id: null, action: '' }}))
                        
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

     

    };

    return (
        <React.Fragment>

            <Paper className={GeneralStyles.paperhearder} elevation={5}>

                <DataTable rows={rows} columns={columns} setAddDialogOpen={undefined} loading={loading}  type={'requests'}/>


            

                {(
                    <AcceptRequestDialog
                        open={acceptDialogOpen}
                        onClose={handleAcceptDialogClose}
                        data={data}
                        setUpdateRow={setUpdateRow}
                    />
                )}

                <AlertConfirmDialog
                    title={dialog_confirm_data.title}
                    message={dialog_confirm_data.message}
                    callBack={handleDialogYes}
                />


            </Paper>

        </React.Fragment>

    );
}
