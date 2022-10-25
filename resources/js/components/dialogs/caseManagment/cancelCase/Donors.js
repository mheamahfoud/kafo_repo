import * as React from 'react';
import { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import GeneralStyles from '../../../styles/GeneralStyles';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { globalSelector } from '../../../../redux/features/global_slice';
import DataTable from '../../../table/DataTable';
export default function Donors({ ...props }) {
    const { t } = useTranslation();
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
                align:'center',
                headerAlign: 'center',
            },
            {
                field: 'secret_name',
                headerName: t('secret_name'),
                align:'center',
                flex: 1, headerAlign: 'center',

            },
            {
                field: 'amount',
                headerName: t('donation_amount'),
                flex: 1,
                align: 'center',
                cellClassName: 'font-tabular-nums',
                type: "number",
                ...usdPrice,
                headerAlign: 'center',
            },
            {
                field: 'donation_percentage',
                headerName: t('donation_percentage'),
                align: 'center',
                flex: 1,
                ...usdPrice,
                headerAlign: 'center',
                renderCell: (params) => {
                    return <span>
                        {((params.row.amount/rows.map(x => x.amount).reduce((a, b) => a + b, 0) ) * 100).toFixed(3)} %
                    </span>
                }
            },
            {
                field: 'paid_amount',
                headerName: t('paid_amount'),
                align: 'center',
                flex: 1,
                ...usdPrice,
                headerAlign: 'center',
             
            },
            {
                field: 'refund_amount',
                headerName: t('refund_amount'),
                align: 'center',
                flex: 1,
                ...usdPrice,
                headerAlign: 'center',
            },

        ]
    );
    useEffect(() => {
        if (props?.donors) {
            var temp= props?.donors.map((item)=>{
                return {
                    ...item,
                    'paid_amount':((item.amount/props?.donors.map(x => x.amount).reduce((a, b) => a + b, 0))*(props.costs.filter(x=>x.is_active==1 && x.status=='paid').map(x => x.value).reduce((a, b) => a + b, 0)) ).toFixed(3),
                    'refund_amount':(item.amount-(item.amount/props?.donors.map(x => x.amount).reduce((a, b) => a + b, 0))*(props.costs.filter(x=>x.is_active==1 && x.status=='paid').map(x => x.value).reduce((a, b) => a + b, 0)) ).toFixed(3)
                }
            })
        //    alert(JSON.stringify(...props?.donors , {'paid_amount':20}))
            // setRows(

            //     [...props?.donors , {'paid_amount':20}],

            // )
            setRows(temp)
            setLoading(false);
        }

    }, [props?.donors])
    return (
        <React.Fragment>

            <Paper className={GeneralStyles.paperhearder} elevation={5}>
            <DataTable rows={rows} columns={columns} setAddDialogOpen={undefined} loading={loading} />


            </Paper>
        </React.Fragment >

    );
}
