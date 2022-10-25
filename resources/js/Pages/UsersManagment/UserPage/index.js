import * as React from 'react';
import { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import GeneralStyles from '../../../components/styles/GeneralStyles';
import { useTranslation } from 'react-i18next';
import { GridActionsCellItem } from '@mui/x-data-grid';
import AddDonorDialog from '../../../components/dialogs/userManagment/users/AddDonor';
import EditDonorDialog from '../../../components/dialogs/userManagment/users/EditDonor';
import { GetDonors } from '../../../api/userManagment/donor';
import EditIcon from '@mui/icons-material/Edit';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';
import moment from 'moment';
import AlertConfirmDialog from '../../../components/dialogs/alert/AlertConfirmDialog';
import { useSelector, useDispatch } from 'react-redux'
import { ActivateDeactivateDonor } from '../../../api/userManagment/donor';
import { useSnackbar } from "notistack";
import ModalImage from "react-modal-image-responsive";
import "./style.css";
import DataTable from '../../../components/table/DataTable';
import ChargeWalletDialog from '../../../components/dialogs/requests/ChargeWallet';
import { useNavigate } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import { globalSelector } from '../../../redux/features/global_slice';
import { mainColor } from '../../../config/constants';
import { setDialogConfirmOpen, setDialogConfirmData } from '../../../redux/features/global_slice';
export default function UserPage() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const { dialog_confirm_data, lang } = useSelector(globalSelector)
    const dispatch = useDispatch()
    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [chargeDialogOpen, setChargeDialogOpen] = React.useState(false);
    const [addRow, setAddRow] = React.useState(null);
    const [updateRow, setUpdateRow] = React.useState(null);
    const [data, setData] = React.useState(null);
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const { enqueueSnackbar } = useSnackbar();
    let navigate = useNavigate();
    const handleShowDialog = () => {
        setIsOpen(current => !current);
    }
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
                width: 60,
                type: "number",
                align: 'center',
                headerAlign: 'center',
            },
            {
                field: 'full_name',
                headerName: t('full_name'),
                align: 'center',
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
                field: 'mobile',
                align: 'center',
                headerName: t('phone_number'),
                type: 'number',
                flex: 1, headerAlign: 'center',

            },
            {
                field: 'gender',
                headerName: t('gender'),
                align: 'center',
                valueOptions: ['Female', 'Male'],
                type: 'singleSelect',
                flex: 1, headerAlign: 'center',
                renderCell: (params) => {
                    return t(params.row.gender)
                }
            },


            {
                field: 'donation_count',
                headerName: t('donation_count'),
                flex: 1,
                //  ...usdPrice 
                align: 'center',
                cellClassName: 'font-tabular-nums',
                type: "number",
                headerAlign: 'center',
            },

            {
                field: 'total_donation_amount',
                headerName: t('total_donation_amount'),
                align: 'center',
                flex: 1,
                ...usdPrice,
                //type: "number",
                headerAlign: 'center',
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
                field: 'is_active',
                headerName: t('status'),
                align: 'center',
                type: 'boolean',
                flex: 1, headerAlign: 'center',

            },
            {
                field: 'actions',
                headerName: t('actions'),
                type: 'actions',
                width: 100,
                getActions: (params) => [
                    < GridActionsCellItem
                        icon={<InfoIcon style={{fill:mainColor}}  />}
                        label={t('detail')}
                        onClick={() => {
                            navigate("/UsersManagment/user/view", { state: { 'name': params.row.full_name, 'id': params.row.id } });
                        }

                        }
                    />,

                    <GridActionsCellItem
                        icon={< EditIcon style={{fill:mainColor}}  />}
                        label={t('update')}
                        showInMenu
                        onClick={() => {
                            setData(params.row)
                            setEditDialogOpen(true);
                        }}
                    />,
                    < GridActionsCellItem
                        showInMenu
                        icon={params.row.is_active ? <RemoveIcon color='success' /> : <CheckIcon color='success' />}
                        label={params.row.is_active ? t('deactivate') : t('activate')}
                        onClick={() => {
                            dispatch(setDialogConfirmOpen(true))
                            dispatch(setDialogConfirmData({ is_active: params.row.is_active, id: params.row.id }))
                        }

                        }
                    />,

                    <GridActionsCellItem
                        icon={< AccountBalanceIcon style={{fill:mainColor}}  />}
                        label={t('charge')}
                        showInMenu
                        onClick={() => {
                            setData(params.row)
                            setChargeDialogOpen(true);
                        }}
                    />,
                ],
            },
        ]
    );

    useEffect(() => {
        GetDonors().then((res) => {
            setRows(res.data.data);
            setLoading(false);
        })
    }, [])
    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    }
    const handleChargeDialogClose = () => {
        setChargeDialogOpen(false);
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
        ActivateDeactivateDonor({ 'id': dialog_confirm_data.id }).then(
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

    return (<React.Fragment>
        <Paper className={GeneralStyles.paperhearder} elevation={5} >

            <DataTable rows={rows} columns={columns} setAddDialogOpen={setAddDialogOpen} loading={loading}  type={'donors'}/>

            {(<AddDonorDialog
                open={addDialogOpen}
                onClose={handleDialogClose}
                setAddRow={setAddRow}

            />)}

            {(
                <EditDonorDialog
                    open={editDialogOpen}
                    onClose={handleEditDialogClose}
                    data={data}
                    setUpdateRow={setUpdateRow}
                />
            )}

            {(
                <ChargeWalletDialog
                    open={chargeDialogOpen}
                    onClose={handleChargeDialogClose}
                    donor_id={data?.id}

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
