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

export default function FormikReadonly({ title, isRequired, ...props }) {
    const classes = useStyles();

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
                <Field
                    {...props}
                    className={classes.inputLabel}
                    component={TextField}
                    InputProps={{
                        readOnly: true,
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Box>
        </div>
    );
}
