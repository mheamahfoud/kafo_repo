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
const FInput = ({ field, form, ...props }) => {
    return <TextField  {...field} {...props} style={{ direction: 'rtl',}} />;
};

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

export default function ARFormikInputLabel({ title, isRequired, ...props }) {
    const classes = useStyles();
    const { errors, touched } = useFormikContext();
    const [value, setValue] = useState();
    const { t } = useTranslation();
    return (
        <div style={{ width: '100%' }}>
            <Box display="flex">
                <Box>
                    <InputLabel
                        style={{
                            direction: 'rtl',
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
                <FastField
                    className={classes.inputLabel}
                    helperText={
                        errors[props.name] && touched[props.name]
                            ? errors[props.name]
                            : null
                    }
                    error={
                        errors[props.name] && touched[props.name] ? true : false
                    }
                    //value={value}
                    //onChange={(e) => setValue(e.target.value)}
                    {...props}
                    component={FInput}
                />
            </Box>
        </div>
    );
}
