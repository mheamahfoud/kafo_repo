import * as React from 'react';
import { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import GeneralStyles from '../../../../components/styles/GeneralStyles';
import { useTranslation } from 'react-i18next';
import { GridActionsCellItem } from '@mui/x-data-grid';
import AddCostDialog from '../../../../components/dialogs/caseManagment/costs/AddCost';
import EditDialogCost from '../../../../components/dialogs/caseManagment/costs/EditCost';
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';
import AlertConfirmDialog from '../../../../components/dialogs/alert/AlertConfirmDialog';
import { useSelector, useDispatch } from 'react-redux'
import { ActivateDeactivateCost } from '../../../../api/caseManager/costs/index';
import DataTable from '../../../../components/table/DataTable';
import { useSnackbar } from "notistack";
import AlertConfirmCostDialog from '../../../../components/dialogs/alert/AlertConfirmCostDialog';
import { globalSelector } from '../../../../redux/features/global_slice';
import { setDialogConfirmCostData,setDialogConfirmCostOpen } from '../../../../redux/features/global_slice';
import { mainColor } from '../../../../config/constants';
export default function CostTab({ ...props }) {
    const { t } = useTranslation();
   
    const dispatch = useDispatch();
    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [addRow, setAddRow] = React.useState(null);
    const [updateRow, setUpdateRow] = React.useState(null);
    const [data, setData] = React.useState(null);
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const { enqueueSnackbar } = useSnackbar();
    const {lang,dialog_confirm_cost_data,dialog_confirm_cost_open} = useSelector(globalSelector)
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
                return (currencyFormatter.format(value).replace('SYP', '')  + ' SYP')
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
                field: 'name',
                headerName: t('name'),
                flex: 1, headerAlign: 'center',

            },
            {
                field: 'value',
                headerName: t('value'),
                flex: 1,
                align: 'center',
                ...usdPrice,
                cellClassName: 'font-tabular-nums',
                type: "number",
                headerAlign: 'center',
            },
            {
                field: 'status',
                headerName: t('status'),
                width: 100,
                valueOptions: ['paid', 'not_paid'],
                type: 'singleSelect',
                headerAlign: 'center',
                renderCell: (params) => {
                    return t(params.row.status)
                }
            },

            {
                field: 'actions',
                headerName: t('actions'),
                type: 'actions',
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
                        label={params.row.is_active ? t('deactivate') : t('activate')}
                        onClick={() => {
                            dispatch(setDialogConfirmCostOpen(true));
                            dispatch(setDialogConfirmCostData({ is_active: params.row.is_active, id: params.row.id }))
                         



                        }

                        }
                    />,
                ],
            },
        ]
    );

    useEffect(() => {
        if (props.case.costs) {
            setRows(props.case.costs)
            setLoading(false);
        }

        // GetCosts().then((res) => {
        //     setRows(res.data.data);
        //     
        // })
    }, [props.case])
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
        ActivateDeactivateCost({ 'id': dialog_confirm_cost_data.id }).then(
            (res) => {
                if (res.success) {
                    var index = rows.findIndex(x => x.id == dialog_confirm_cost_data.id);
                    var temp = rows.find(x => x.id == dialog_confirm_cost_data.id);
                    temp['is_active'] = !temp['is_active'];
                    setRows([
                        ...rows.slice(0, index),
                        temp,
                        ...rows.slice(index + 1, rows.length)]);
                        dispatch(setDialogConfirmCostOpen(false));
                        dispatch(setDialogConfirmCostData({ is_active: 0, id: null }))
                     
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
                <DataTable rows={rows} columns={columns} setAddDialogOpen={setAddDialogOpen} loading={loading} disableVirtualization={true} type={'costs'} case_id={props.case?.id} />

                <AddCostDialog
                    open={addDialogOpen}
                    case_id={props.case?.id}
                    onClose={handleDialogClose}
                    setAddRow={setAddRow}

                />

                {(
                    <EditDialogCost
                        open={editDialogOpen}
                        onClose={handleEditDialogClose}
                        data={data}
                        setUpdateRow={setUpdateRow}
                    />
                )}


                <AlertConfirmCostDialog
                    title={''}
                    message={dialog_confirm_cost_data.is_active ? t('sure_inactivate') : t('sure_activate')}
                    callBack={handleActivateDialogYes}
                />

            </Paper>
        </React.Fragment>

    );
}
