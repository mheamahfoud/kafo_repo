import * as React from 'react';
import { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import GeneralStyles from '../../../components/styles/GeneralStyles';
import { useTranslation } from 'react-i18next';
import { GridActionsCellItem } from '@mui/x-data-grid';
import AddProvider from '../../../components/dialogs/setup/providers/AddProvider';
import EditProvider from '../../../components/dialogs/setup/providers/EditProvider';
import { GetProviders } from '../../../api/setUp/provider';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';
import moment from 'moment';
import AlertConfirmDialog from '../../../components/dialogs/alert/AlertConfirmDialog';
import { useSelector, useDispatch } from 'react-redux'
import { ActivateDeactivateProviders } from '../../../api/setUp/provider';
import ModalImage from "react-modal-image-responsive";
import DataTable from '../../../components/table/DataTable';
import { useSnackbar } from "notistack";
import "./style.css";
import { globalSelector } from '../../../redux/features/global_slice';
import { setDialogConfirmOpen, setDialogConfirmData } from '../../../redux/features/global_slice';
import { mainColor } from '../../../config/constants';
export default function ProviderPage() {
    const { t } = useTranslation();
    // const [status, setStatus] = React.useState('connected');
    // const [tableTranslator, setTableTranslator] = React.useState(GRID_DEFAULT_LOCALE_TEXT);
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

    const handleShowDialog = () => {

        setIsOpen(current => !current);
    }
    const handleShowDialog1 = () => {
        // alert(1)
        // setIsOpen( isOpen: !isOpen )
        setIsOpen(false);
    }
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
                field: 'name',
                align: 'center',

                headerName: t('name'),
                flex: 1, headerAlign: 'center',

            },
            {
                field: 'medias',
                width: 100,
                // height: 200,
                headerName: t('image'),
                headerAlign: 'center',
                //   flex: 1,
                renderCell: (params) => {
                    // return params.row.image_url
                    return (
                        <>
                            <ModalImage
                                className="img-fluid"
                                small={params.row.image_path}
                                large={params.row.image_path}
                              //  alt={params.row.display_name}
                            />
                            {/* <img src={params.row.image_url} className='img-fluid' alt="..." /> */}
                            {/* 
                            {isOpen && (
                                <dialog
                                    className="dialog"
                                    style={{ position: "absolute" }}
                                    open
                                    onClick={handleShowDialog1}
                                >
                                    <img
                                        className="image"
                                        src={params.row.image_url}
                                        onClick={handleShowDialog1}
                                        alt="no image"
                                    />
                                </dialog>
                            )} */}

                            {/* <div className='rounded mx-auto d-block' style= {{width: '100%' ,height: '100%',  background: `url(${params.row.image_url}) no-repeat center center /cover `}}>&nbsp;</div> */}

                            {/* <img width={60}
                                alt='Player' src= /> */}

                        </>
                    )
                }

            },
            {
                field: 'description',
                align: 'center',
                headerName: t('description'),
                flex: 1, headerAlign: 'center',

            },
            {
                field: 'created_at',
                align: 'center',
                headerName: t('created_at'),
                type: 'date',
                valueFormatter: params =>
                    new Date(params?.value).toLocaleDateString(lang == 'ar' ? 'ar-EG' : 'en-US'),
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
                field: 'related_validation_count',
                align: 'center',
                headerName: t('related_validation_count'),
                type: 'number',
                flex: 1, headerAlign: 'center',

            },

            {
                field: 'related_cases_count',
                align: 'center',
                headerName: t('related_cases_count'),
                type: 'number',
                flex: 1, headerAlign: 'center',

            },



            {
                field: 'actions',

                headerName: t('actions'),
                type: 'actions',
                width: 100,
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
        GetProviders().then((res) => {
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
        ActivateDeactivateProviders({ 'id': dialog_confirm_data.id }).then(
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
                <DataTable rows={rows} columns={columns} setAddDialogOpen={setAddDialogOpen} loading={loading}  type={'providers'} />

                <AddProvider
                    open={addDialogOpen}
                    onClose={handleDialogClose}
                    setAddRow={setAddRow}

                />

                {(
                    <EditProvider
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
