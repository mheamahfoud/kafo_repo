import * as React from 'react';
import { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import GeneralStyles from '../../../styles/GeneralStyles';
import { useTranslation } from 'react-i18next';
import {  Grid,  } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import DataTable from '../../../table/DataTable';
import InputLabelDetail from '../../../BlockDetail/InputLabelDetail';
import InputAmountDetails from '../../../BlockDetail/InputAmountDetails';
import { globalSelector } from '../../../../redux/features/global_slice';
export default function Costs({ ...props }) {
    const { t } = useTranslation();
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const lang = useSelector(globalSelector)
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
                field: 'name',
                align:'center',
                headerName: t('name'),
                flex: 1, headerAlign: 'center',

            },
            {
                field: 'value',
                headerName: t('value'),
                flex: 1,
                align: 'center',
                cellClassName: 'font-tabular-nums',
                type: "number",
                ...usdPrice,
                headerAlign: 'center',
            },
            {
                field: 'status',
                align:'center',
                headerName: t('status'),
                width: 100,
                valueOptions: ['paid', 'not_paid'],
                type: 'singleSelect',
                headerAlign: 'center',
                renderCell: (params) => {
                    return t(params.row.status)
                }
            },


        ]
    );
    useEffect(() => {
        if (props?.costs) {
            setRows(props?.costs)
            setLoading(false);
        }

    }, [props?.costs])
    return (
        <React.Fragment>

            <Paper className={GeneralStyles.paperhearder} elevation={5}>
                <Grid container spacing={3} style={{padding:'10px'}}>
                    <Grid container item md={6} sm={12}>

                        <InputAmountDetails title={t('total_cost')} value={props?.costs?.filter(x=>x.is_active).map(x => x.value).reduce((a, b) => a + b, 0)} />


                    </Grid>

                    <Grid container item md={6} sm={12}>

                        <InputAmountDetails title={t('total_paid_cost')} value={props?.costs?.filter(x => x.status == 'paid' && x.is_active).map(x => x.value).reduce((a, b) => a + b, 0)} />


                    </Grid>

                </Grid>
                <DataTable rows={rows} columns={columns} setAddDialogOpen={undefined} loading={loading} />



            </Paper>
        </React.Fragment >

    );
}
