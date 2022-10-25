import React, { useEffect, useState } from 'react';
import {
    TextField,
    InputLabel,
    Box,
    makeStyles,
    Card,
} from '@material-ui/core';
import { Field, useFormikContext } from 'formik';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
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

export default function FormikDateTimePicker({
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
            props.name.split('.').map((item) => {
                x = x[item];
            });
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
                        className={classes.inputLabel}
                        component={DateTimePicker}
                        size="small"
                        ampm={false}
                        autoOk
                        format="yyyy-MM-DD HH:mm:ss"
                        value={fromDate}
                        onChange={(date) => {
                            handleFromDate(date);
                            setFieldValue(
                                props.name,
                                date.format('yyyy-MM-DD HH:mm:ss'),
                            );
                        }}
                    />
                </MuiPickersUtilsProvider>
            </Box>
        </div>
    );
}
