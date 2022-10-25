import * as React from 'react';
import { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import GeneralStyles from '../../../../components/styles/GeneralStyles';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux'
import { GetDonorsCase } from '../../../../api/caseManager/case';
import moment from 'moment';
import DataTable from '../../../../components/table/DataTable';
import { globalSelector } from '../../../../redux/features/global_slice';
import { mainColor } from '../../../../config/constants'
export default function DonorsTab({ ...props }) {
    const { t } = useTranslation();
    const {dialog_confirm_data} = useSelector(globalSelector);
    const dispatch = useDispatch();
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const {lang} = useSelector(globalSelector)
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
                align: 'center',
                headerAlign: 'center',
            },

            {
                field: 'secret_name',
                headerName: t('secret_name'),
                align: 'center',
                flex: 1,
                headerAlign: 'center',
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
                field: 'donation_percentage',
                headerName: t('donation_percentage'),
                flex: 1,
                align: 'center',
                cellClassName: 'font-tabular-nums',
                type: "number",
                headerAlign: 'center',
                renderCell: (params) => {
                    return <span>
                        {(params.row.amount / (rows.map(x => x.amount).reduce((a, b) => a + b, 0))) * 100} %
                    </span>
                }

            },
            {
                field: 'created_at',
                headerName: t('donation_date_time'),
                type: 'dateTime',
                align: 'center',
                valueFormatter: params =>
                    new Date(params?.value).toLocaleDateString(lang == 'ar' ? 'ar-EG' : 'en-US'),
                flex: 1,

            },


        ]
    );

    useEffect(() => {
        if (props.case?.id) {

            GetDonorsCase({ 'case_id': props.case?.id }).then((res) => {
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

                <DataTable rows={rows} columns={columns} setAddDialogOpen={undefined} loading={loading} disableVirtualization={true}  type={'case_donors'} case_id={props.case?.id} />


            </Paper>
        </React.Fragment>

    );
}
