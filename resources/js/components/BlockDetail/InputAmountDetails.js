
import React, { useEffect, useState } from 'react';
import {
    TextField,
    InputLabel,
    Box,
    makeStyles,
    Card,
} from '@material-ui/core';
import { Field, useFormikContext } from 'formik';
import { FastField } from 'formik';
import { useTranslation } from 'react-i18next';
import InputAdornment from '@mui/material/InputAdornment';
import { useSelector, useDispatch } from 'react-redux'
import { globalSelector } from '../../redux/features/global_slice';

const useStyles = makeStyles((theme) => ({
    Circle: {
        height: '10px',
        width: '10px',
        backgroundColor: 'red',
        borderRadius: '50%',
        margin: '3px',
        marginLeft: '12px',
    },
    inputLabel: {
        width: '100%',
        marginTop: '3px',
        padding: '0px',

    },
}));

export default function InputAmountDetails({ title, value }) {
    const classes = useStyles();
    const { t } = useTranslation();
    const {lang} = useSelector(globalSelector)
    const currencyFormatter = new Intl.NumberFormat(lang == 'ar' ? 'ar-EG' : 'en-US', {
        style: 'currency',
        currency: 'SYP',
    });
    return (
        <div style={{ width: '100%' }}>
            <Box display="flex">
                <Box>
                    <InputLabel
                        style={{
                            color: 'black',
                            width: 'auto',
                        }}
                    >
                        {title}
                    </InputLabel>
                </Box>

            </Box>

            <Box>
                <TextField disabled  className={classes.inputLabel} value={ lang =='en' ? (currencyFormatter.format(value).replace('SYP', '')  + ' SYP') : currencyFormatter.format(value)} InputProps={{
                    readOnly: true,
      
                }}  autoFocus={false}   onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}/>

            </Box>
        </div>
    );
}




