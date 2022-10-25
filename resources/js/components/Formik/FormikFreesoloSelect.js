import React, { useEffect, useState } from 'react';
import {
    InputLabel,
    TextField,
    Box,
    makeStyles,
    Card,
    IconButton,
} from '@material-ui/core';
import { Field, useFormikContext } from 'formik';
import AddIcon from '@material-ui/icons/Add';
import { Autocomplete } from '@material-ui/lab';

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
    },
}));

export default function FormikFreesoloSelect({
    title,
    isRequired,
    setFieldValue,
    ...props
}) {
    const classes = useStyles();
    const [value, setValue] = useState([]);
    const { initialValues, values } = useFormikContext();

    useEffect(() => {
        if (values[props.name] == undefined) {
            setValue([]);
            return;
        }

        setValue(values[props.name].split(','));
    }, [values[props.name]]);

    useEffect(() => {
        if (value[0] == '') setValue([]);
    }, [value]);

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
            <Box display="flex">
                <Box flexGrow={1}>
                    <Field
                        {...props}
                        className={classes.inputLabel}
                        component={Autocomplete}
                        multiple
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                            setFieldValue(
                                props.name,
                                newValue.map((item) => item).toString(),
                            );
                        }}
                        freeSolo
                        options={[]}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Box>
            </Box>
        </div>
    );
}
