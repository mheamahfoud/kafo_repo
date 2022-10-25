import * as React from 'react';
import { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import GeneralStyles from '../../../../components/styles/GeneralStyles';
import { useTranslation } from 'react-i18next';
import { GridActionsCellItem } from '@mui/x-data-grid';
import AddValidationDialog from '../../../../components/dialogs/caseManagment/validations/AddValidation';
import EditValidationDialog from '../../../../components/dialogs/caseManagment/validations/EditValidation';
import { GetValidationsByCase, DeleteValidation } from '../../../../api/caseManager/validations';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertConfirmDialog from '../../../../components/dialogs/alert/AlertConfirmDialog';
import { useSelector, useDispatch } from 'react-redux'
import { Image } from "react-bootstrap";
import { useSnackbar } from "notistack";
import DataTable from '../../../../components/table/DataTable';
import "./style.css";
import { globalSelector, setDialogConfirmData, setDialogConfirmOpen } from '../../../../redux/features/global_slice';
import { mainColor } from '../../../../config/constants'
export default function ValidationTab({ ...props }) {
    const { t } = useTranslation();
    // const [status, setStatus] = React.useState('connected');
    // const [tableTranslator, setTableTranslator] = React.useState(GRID_DEFAULT_LOCALE_TEXT);
    const [isOpen, setIsOpen] = useState(false);
    const {dialog_confirm_data} = useSelector(globalSelector)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [addRow, setAddRow] = React.useState(null);
    const [updateRow, setUpdateRow] = React.useState(null);
    const [data, setData] = React.useState(null);
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
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
                field: 'name',
                headerName: t('name'),
                flex: 1, headerAlign: 'center',

            },
            {
                field: 'type_name',
                headerName: t('type'),
                width: 100, headerAlign: 'center',

            },
            // {
            //     field: 'medias',
            //     width:100 ,
            //     // height: 200,
            //     headerName: t('image'),
            //     headerAlign: 'center',
            //  //   flex: 1,
            //     renderCell: (params) => {
            //         // return params.row.image_url
            //         return (
            //             <>
            //                 <ModalImage
            //                     className="img-fluid"
            //                     small={params.row.image_url}
            //                     large={params.row.image_url}
            //                     alt={params.row.display_name}
            //                 />

            //             </>
            //         )
            //     }

            // },
            {
                field: 'description',
                headerName: t('description'),
                flex: 1, headerAlign: 'center',

            },
            {
                field: 'status',
                headerName: t('status'),
                width: 100,
                valueOptions: ['valid', 'not_valid'],
                type: 'singleSelect',
                headerAlign: 'center',
                renderCell: (params) => {
                    return t(params.row.status)
                }
            },
            {
                field: 'provider_name',
                headerName: t('provider_name'),
                flex: 1, headerAlign: 'center',

            },

            {
                field: 'provider_image',
                width: 120,
                headerName: t('provider_image'),
                headerAlign: 'center',
                renderCell: (params) => {
                    // return params.row.image_url
                    return (
                        <a href={params.row.provider_download_url} download >
                            <Image
                                fluid
                                src={params.row.provider_image_url}

                                thumbnail

                            />
                        </a>
                    )
                }

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
                        icon={<DeleteIcon color='danger' />}
                        label={t('delete')}
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
        if (props.case?.id)
            GetValidationsByCase({ 'case_id': props.case.id }).then((res) => {
                setRows(res.data.data);
                setLoading(false);
            })
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

    const handleDeleteDialogYes = () => {
        DeleteValidation({ 'id': dialog_confirm_data.id }).then(
            (res) => {
                if (res.success) {
                    var index = rows.findIndex(x => x.id == dialog_confirm_data.id);
                    setRows([
                        ...rows.slice(0, index),
                        //res.data,
                        ...rows.slice(index + 1, rows.length)]);
                 
                    dispatch(setDialogConfirmOpen(false))
                    dispatch(setDialogConfirmData( { is_active: 0, id: null }))
                
                    
                    enqueueSnackbar(t('delelted_successfully'), {
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
            <DataTable rows={rows} columns={columns} setAddDialogOpen={setAddDialogOpen} loading={loading} disableVirtualization={true}  type={'validations'} case_id={props.case?.id}/>

                <AddValidationDialog
                    open={addDialogOpen}
                    case_id={props.case?.id}
                    onClose={handleDialogClose}
                    setAddRow={setAddRow}

                />

                {(
                    <EditValidationDialog
                        open={editDialogOpen}
                        onClose={handleEditDialogClose}
                        data={data}
                        setUpdateRow={setUpdateRow}
                    />
                )}

                <AlertConfirmDialog
                    title={''}
                    message={t('sure_delete')}
                    callBack={handleDeleteDialogYes}
                />


            </Paper>
        </React.Fragment>

    );
}
