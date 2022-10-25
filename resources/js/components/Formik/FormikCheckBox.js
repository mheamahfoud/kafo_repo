import React, { useEffect, useState } from 'react';
import { InputLabel, Box, makeStyles, Card, Button } from '@material-ui/core';
import { Field, useFormikContext } from 'formik';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';

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
    btn: {
        width: '100%',
        borderRadius: '25px!important',
        borderColor: '#0c7c80!important',
        textTransform: 'initial',
        margin: '3px',
        backgroundColor: '#fff',
        color: '#0c7c80',
        padding: '4px',
        '&.Mui-selected': {
            backgroundColor: '#0c7c80',
            color: '#fff',
        },
        '&:hover': {
            color: '#fff',
        },
    },
}));

export default function FormikCheckBox({
    title,
    isRequired,
    setFieldValue,
    options,
    ...props
}) {
    const classes = useStyles();
    const { initialValues, values, errors, touched } = useFormikContext();
    const [value, setValue] = React.useState();
    const { t } = useTranslation();

    const handleChange = (event, newValue) => {
        setFieldValue(props.name, newValue);
        setValue(newValue);
    };

    useEffect(() => {
        if (values[props.name] == undefined) {
            setValue();
            return;
        }
        setValue(values[props.name]);
    }, [values[props.name]]);

    useEffect(() => {
        setValue(initialValues[props.name]);
    }, []);

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
                {errors[props.name] && touched[props.name] && (
                    <InputLabel
                        style={{
                            color: 'red',
                            width: 'auto',
                            paddingLeft: '6px',
                        }}
                    >
                        {errors[props.name]}
                    </InputLabel>
                )}
            </Box>
            <Box>
                <ToggleButtonGroup
                    value={value}
                    exclusive
                    className={classes.inputLabel}
                    onChange={handleChange}
                >
                    {options.map((item) => {
                        return (
                            <ToggleButton
                                key={item.value}
                                value={item.value}
                                className={classes.btn}
                            >
                                {t(item.text)}
                            </ToggleButton>
                        );
                    })}
                </ToggleButtonGroup>
            </Box>
        </div>
    );
}
