import * as React from 'react';
import { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import GeneralStyles from '../../../../components/styles/GeneralStyles';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux'
import { GetFollowersCase } from '../../../../api/caseManager/case';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import { Image, } from "react-bootstrap";
import InputLabelDetail from '../../../../components/BlockDetail/InputLabelDetail';
import DataTable from '../../../../components/table/DataTable';
import { globalSelector } from '../../../../redux/features/global_slice';


export default function DonationsTab({ ...props }) {
    const { t } = useTranslation();
    const {dialog_confirm_data} = useSelector(globalSelector);
    const {lang} = useSelector(globalSelector)
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [donations, setDonations] = useState([]);
    useEffect(() => {
        if (props?.donor?.donations) {
            setRows(props.donor.donations)
            setLoading(false);
        }

    }, [props.donor])
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
                align:'center',
                headerAlign: 'center',
            },
            {
                field: 'amount',
                headerName: t('donation_amount'),
                flex: 1,
                ...usdPrice,
                headerAlign: 'center',
                align:'center',
                renderCell: (params) => {
                    //   return  props.donor.
                }
            },
            {
                field: 'case_name',
                headerName: t('case_name'),
                flex: 1,
                align:'center',
                headerAlign: 'center',
                renderCell: (params) => {
                    return params.row.case?.name
                    //   return  props.donor.
                }
            },

            {
                field: 'created_at',
                headerName: t('donation_date_time'),
                type: 'date',
                align:'center',
                valueFormatter: params =>
                new Date(params?.value).toLocaleDateString(lang == 'ar' ? 'ar-EG' : 'en-US'),
                flex: 1,

            },



        ]
    );



    return (
        <React.Fragment>

            <Paper className={GeneralStyles.paperhearder} elevation={5}>
                <Grid container style={{padding:'10px'}}>
                    <Grid container item md={12} sm={12}>
                        <InputLabelDetail title={t('total_donations')} value={props.donor?.donations?.length} />
                    </Grid>
                </Grid>
                <DataTable rows={rows} columns={columns} setAddDialogOpen={undefined} loading={loading}  disableVirtualization={true}/>


            </Paper>
        </React.Fragment>

    );
}
