import * as React from 'react';
import { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import GeneralStyles from '../../../components/styles/GeneralStyles';
import { useTranslation } from 'react-i18next';
import { GridActionsCellItem } from '@mui/x-data-grid';
import AddAdmin from '../../../components/dialogs/userManagment/admins/AddAdmin';
import EditAdmin from '../../../components/dialogs/userManagment/admins/EditAdmin';
import { GetAdmins } from '../../../api/userManagment/admin';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';
import moment from 'moment';
import AlertConfirmDialog from '../../../components/dialogs/alert/AlertConfirmDialog';
import { useSelector, useDispatch } from 'react-redux'
import { ActivateDeactivateAdmin } from '../../../api/userManagment/admin';
import DataTable from '../../../components/table/DataTable';
import { useSnackbar } from "notistack";
import { globalSelector } from '../../../redux/features/global_slice';
import { setDialogConfirmOpen, setDialogConfirmData } from '../../../redux/features/global_slice';
import { mainColor } from '../../../config/constants';
export default function AdminPage() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const { dialog_confirm_data, lang } = useSelector(globalSelector)
    const dispatch = useDispatch()
    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [addRow, setAddRow] = React.useState(null);
    const [updateRow, setUpdateRow] = React.useState(null);
    const [data, setData] = React.useState(null);
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const { enqueueSnackbar } = useSnackbar();
   
    const columns = React.useMemo(
        () => [
            {
                field: 'id',
                headerName: t('id'),
                width: 80,
                align: 'center',
                type: "number",
                headerAlign: 'center',
            },
            {
                field: 'full_name',
                headerName: t('full_name'),
                flex: 1, headerAlign: 'center',
                align: 'center',

            },
            {
                field: 'user_name',
                align: 'center',
                headerName: t('user_name'),
                flex: 1, headerAlign: 'center',

            },
            {
                field: 'created_at',
                headerName: t('created_at'),
                align: 'center',
                type: 'date',
                valueFormatter: params =>
                    new Date(params?.value).toLocaleDateString(lang == 'ar' ? 'ar-EG' : 'en-US'),
                flex: 1, headerAlign: 'center',

            },
            {
                field: 'created_by',
                headerName: t('created_by'),
                type: 'text',
                align: 'center',
                flex: 1, headerAlign: 'center',

            },
            {
                field: 'actions',
                headerName: t('actions'),
                type: 'actions',
                width: 80,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<EditIcon style={{fill:mainColor}}  />}
                        label={t('update')}
                        onClick={() => {
                            setData(params.row)
                            setEditDialogOpen(true);
                        }}
                    />,
                    <GridActionsCellItem
                        icon={params.row.is_active ? <RemoveIcon color='success' /> : <CheckIcon color='success' />}
                        label={params.row.is_active ? t('activate') : t('deactivate')}
                        onClick={() => {
                            dispatch(setDialogConfirmOpen(true))
                            dispatch(setDialogConfirmData({ is_active: params.row.is_active, id: params.row.id }))
                         
                        }

                        }
                    />,
                ],
            },
        ]
    );

    useEffect(() => {
        GetAdmins().then((res) => {
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
    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
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
        ActivateDeactivateAdmin({ 'id': dialog_confirm_data.id }).then(
            (res) => {
                if (res.success) {
                    var index = rows.findIndex(x => x.id == dialog_confirm_data.id);
                    setRows([
                        ...rows.slice(0, index),
                        res.data,
                        ...rows.slice(index + 1, rows.length)]);
                        dispatch(setDialogConfirmOpen(false))
                        dispatch(setDialogConfirmData({ is_active: 0, id: null }))
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

    return (
        <React.Fragment>

            <Paper className={GeneralStyles.paperhearder} elevation={5}>

                <DataTable rows={rows} columns={columns} setAddDialogOpen={setAddDialogOpen} loading={loading} type={'admins'} />


                <AddAdmin
                    open={addDialogOpen}
                    onClose={handleDialogClose}
                    setAddRow={setAddRow}

                />

                {(
                    <EditAdmin
                        open={editDialogOpen}
                        onClose={handleEditDialogClose}
                        data={data}
                        setUpdateRow={setUpdateRow}
                    />
                )}

                <AlertConfirmDialog
                    title={''}
                    message={dialog_confirm_data.is_active ? t('sure_inactivate') : t('sure_activate')}
                    callBack={handleActivateDialogYes}
                />


            </Paper>

        </React.Fragment>

    );
}
