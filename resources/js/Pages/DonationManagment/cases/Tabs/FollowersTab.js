import * as React from 'react';
import { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import GeneralStyles from '../../../../components/styles/GeneralStyles';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux'
import { GetFollowersCase } from '../../../../api/caseManager/case';
import moment from 'moment';
import { Image, } from "react-bootstrap";
import DataTable from '../../../../components/table/DataTable';
import { globalSelector } from '../../../../redux/features/global_slice';
export default function FollowersTab({ ...props }) {
    const { t } = useTranslation();
    const {dialog_confirm_data} = useSelector(globalSelector);
    const dispatch = useDispatch();
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const {lang} = useSelector(globalSelector)
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
                field: 'full_name',
                headerName: t('full_name'),
                flex: 1,
                headerAlign: 'center',
            },

            {
                field: 'following_date',
                headerName: t('following_date'),
                type: 'date',
                valueFormatter: params =>
                    new Date(params?.value).toLocaleDateString(lang == 'ar' ? 'ar-EG' : 'en-US'),
                flex: 1,

            },
            {
                field: 'image',
                width: 120,
                // height: 200,
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


        ]
    );

    useEffect(() => {
        if (props.case?.id) {

            GetFollowersCase({ 'case_id': props.case?.id }).then((res) => {
                if (res.success) {
                    setRows(res.data.data)
                    setLoading(false);
                }
            }

            )
        }
    }, [props.case])

    return (
        <React.Fragment>

            <Paper className={GeneralStyles.paperhearder} elevation={5}>
                <DataTable rows={rows} columns={columns} setAddDialogOpen={undefined} loading={loading} disableVirtualization={true}  type={'followers'} case_id={props.case?.id} />


            </Paper>
        </React.Fragment>

    );
}
