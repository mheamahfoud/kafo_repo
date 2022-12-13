import * as React from 'react';
import { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import GeneralStyles from '../../../components/styles/GeneralStyles';
import { useTranslation } from 'react-i18next';
import { GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';
import moment from 'moment';
import AlertConfirmDialog from '../../../components/dialogs/alert/AlertConfirmDialog';
import { useSelector, useDispatch } from 'react-redux'
import { ActivateDeactivateQuestion, GetQuestions } from '../../../api/setUp/faq';
import DataTable from '../../../components/table/DataTable';
import { useSnackbar } from "notistack";
import { globalSelector } from '../../../redux/features/global_slice';
import { setDialogConfirmOpen, setDialogConfirmData } from '../../../redux/features/global_slice';
import Tooltip from '@material-ui/core';
import { mainColor } from '../../../config/constants';
import { useNavigate } from "react-router-dom";
export default function FAQPage() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const { dialog_confirm_data, lang } = useSelector(globalSelector)
    const dispatch = useDispatch()
    const [addNewQuestion, setAddNewQuestion] = React.useState(false);
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
                width: 80,
                type: "number",
                align: 'center',
                headerAlign: 'center',
            },
            {
                field: 'question',
                headerName: t('question'),
                align: 'center',
                type: 'text',
                flex: 1, headerAlign: 'center',
                renderCell: (params) => (
                    params.row.question
                    // <Tooltip title={<div style={{ fontSize: '15px' }} > {}</div>}>
                    //     <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    //         {params.row.question}
                    //     </div>
                    // </Tooltip>
                ),
            },
            {
                field: 'answer',
                headerName: t('answer'),
                align: 'center',
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
                flex: 1, headerAlign: 'center',

            },
            {
                field: 'actions',
                headerName: t('actions'),
                type: 'actions',
                width: 80,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<EditIcon style={{ fill: mainColor }} />}
                        label={t('update')}
                        onClick={() => {
                            navigate("/setup/faq/edit_question", { state: { data: {"ar_question": params.row.ar_question,"en_question": params.row.en_question,"en_answer": params.row.en_answer,"ar_answer": params.row.ar_answer} ,question_id:params.row.id } });
                        }}
                    />,
                    <GridActionsCellItem
                        // disabled={params.row?.donors?.length  > 0  && params.row.is_active}
                        icon={params.row.is_active ? <RemoveIcon color='success' /> : <CheckIcon color='success' />}
                        label={params.row.is_active ? t('deactivate ') : t('activate')}
                        title={params.row?.donors?.length > 0 && params.row.is_active ? 'can not deactivate users related to' : ''}
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
        GetQuestions().then((res) => {
            setRows(res.data.data);
            setLoading(false);
        })
    }, [])


    React.useEffect(() => {
        if (addNewQuestion) {
            navigate("/setup/faq/create_question", { state: {} });

        }
    }, [addNewQuestion])

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
        ActivateDeactivateQuestion({ 'id': dialog_confirm_data.id }).then(
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

                <DataTable rows={rows} columns={columns} setAddDialogOpen={setAddNewQuestion} loading={loading} type={'faqs'} />
                <AlertConfirmDialog
                    title={''}
                    message={dialog_confirm_data.is_active ? t('sure_inactivate') : t('sure_activate')}
                    callBack={handleActivateDialogYes}
                />


            </Paper>
        </React.Fragment>

    );
}
