import * as React from 'react';
import { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import GeneralStyles from '../../../components/styles/GeneralStyles';
import { useTranslation } from 'react-i18next';
import { arSD, GridActionsCellItem } from '@mui/x-data-grid';
import AddSuccessStoryDialog from '../../../components/dialogs/successStrory/AddSuccessStrory';
import EditSuccessStoryDialog from '../../../components/dialogs/successStrory/EditSuccessStory';
import { GetSuccessStrories, ActivateDeactivateSuccessStory } from '../../../api/successStrories/SuccessStrory';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';
import moment from 'moment';
import AlertConfirmDialog from '../../../components/dialogs/alert/AlertConfirmDialog';
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from "notistack";
import "./style.css";
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import DataTable from '../../../components/table/DataTable';
import { globalSelector } from '../../../redux/features/global_slice';
import { setDialogConfirmOpen, setDialogConfirmData } from '../../../redux/features/global_slice';
import { mainColor } from '../../../config/constants';
export default function SuccessStoryPage() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const {lang,dialog_confirm_data} = useSelector(globalSelector)

    const dispatch = useDispatch()
    const handleShowDialog = () => {
        setIsOpen(current => !current);
    }


    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [addRow, setAddRow] = React.useState(null);
    const [updateRow, setUpdateRow] = React.useState(null);
    const [data, setData] = React.useState(null);
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const { enqueueSnackbar } = useSnackbar();
    let navigate = useNavigate();

    const columns = React.useMemo(
        () => [
            {
                field: 'id',
                headerName: t('id'),
                width: 60,
                align: 'center',
                type: "number",
                headerAlign: 'center',
            },
            {
                field: 'case_name',
                headerName: t('case_name'),
                align: 'center',
                type: 'text',
                flex: 1, headerAlign: 'center',

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
                field: 'description',
                headerName: t('description'),
                align: 'center',
                type: 'text',
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
                align: 'center',
                type: 'text',
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
                field: 'actions',
                headerName: t('actions'),
                type: 'actions',
                width: 120,
                getActions: (params) => [

                    < GridActionsCellItem
                        icon={<InfoIcon style={{fill:mainColor}}  />}
                        label={t('detail')}
                        onClick={() => {
                            navigate("/Donation/success-stories/view", { state: { 'name': params.row.case_name, 'id': params.row.id } });
                        }

                        }
                    />,

                    <GridActionsCellItem
                        icon={< EditIcon style={{fill:mainColor}}  />}
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
        GetSuccessStrories().then((res) => {
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
                setRows([
                    ...rows.slice(0, index),
                    updateRow,
                    ...rows.slice(index + 1, rows.length)]);
        }
    }, [updateRow])

    const handleActivateDialogYes = () => {
        ActivateDeactivateSuccessStory({ 'id': dialog_confirm_data.id }).then(
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

    return (<React.Fragment>
        <Paper className={GeneralStyles.paperhearder} elevation={5} >
            <DataTable rows={rows} columns={columns} setAddDialogOpen={setAddDialogOpen} loading={loading} type={'successStories'} />
            {(<AddSuccessStoryDialog
                open={addDialogOpen}
                onClose={handleDialogClose}
                setAddRow={setAddRow}

            />)}

            {editDialogOpen && (
                <EditSuccessStoryDialog
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
