import React, { useEffect, useState } from 'react';
import {
    TextField,
    InputLabel,
    Box,
    makeStyles,
    Card,
} from '@material-ui/core';
import { Field, useFormikContext } from 'formik';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    Circle: {
        height: '10px',
        width: '10px',
        backgroundColor: 'red',
        borderRadius: '50%',
        display: 'inline-block',
        margin: '3px',
        marginLeft: '12px',
    },
    inputLabel: {
        width: '100%',
        padding: '0px',
        marginTop: '3px',
    },
}));

export default function FormikDatePicker({
    title,
    isRequired,
    setFieldValue,
    ...props
}) {
    const classes = useStyles();
    const [fromDate, handleFromDate] = useState(null);
    const { values, errors, touched } = useFormikContext();

    useEffect(() => {
        let pName = props.name.split('.')[0];

        if (values[pName] == undefined) {
            handleFromDate(null);
            return;
        }

        if (props.name.includes('.')) {
            let x = values;
            console.log(x)
            props.name.split('.').map((item) => {
                console.log(item)
                x = x[item];
            });
            console.log(x)
            if (x == undefined) return;

            handleFromDate(x);
        } else {
            handleFromDate(values[pName]);
        }
    }, [values[props.name.split('.')[0]]]);

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
                {isRequired && (
                    <Box>
                        <Card className={classes.Circle}></Card>
                    </Box>
                )}
            </Box>
            <Box>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Field
                        {...props}
                        className={classes.inputLabel}
                        component={DatePicker}
                        size="small"
                        openTo="year"
                        autoOk
                        helperText={
                            errors[props.name] && touched[props.name]
                                ? errors[props.name]
                                : null
                        }
                        error={
                            errors[props.name] && touched[props.name]
                                ? true
                                : false
                        }
                        format="yyyy/MM/DD"
                        views={['year', 'month', 'date']}
                        value={fromDate}
                        onChange={(date) => {
                            handleFromDate(date);
                            setFieldValue(
                                props.name,
                                date.format('yyyy-MM-DD'),
                            );
                        }}
                    />
                </MuiPickersUtilsProvider>
            </Box>
        </div>
    );
}
