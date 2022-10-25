import React, { useEffect } from 'react';
import { InputLabel, Box, makeStyles, Card } from '@material-ui/core';
import { Field, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import IosSwitch from '../IosSwitch';

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
        margin: '3px',
        backgroundColor: '#fff',
        color: '#0c7c80',
        padding: '4px',
        '&.Mui-selected': {
            backgroundColor: '#0c7c80',
            color: '#fff',
        },
    },
}));

export default function FormikSwitch({ title, isRequired, options, ...props }) {
    const classes = useStyles();
    const { setFieldValue, values } = useFormikContext();
    const [value, setValue] = React.useState(true);

    const handleChange = (event, newValue) => {
        setFieldValue(props.name, newValue ? 1 : 0);
        setValue(newValue);
    };

    useEffect(() => {
        if (
            values[props.name.substr(0, props.name.indexOf('.'))] == undefined
        ) {
            setValue();
            return;
        }

        if (props.name.includes('.')) {
            if (
                values[props.name.substr(0, props.name.indexOf('.'))] !=
                undefined
            ) {
                let x = values;
                props.name.split('.').map((item) => {
                    if (x[item] == undefined) return;
                    x = x[item];
                });
                setValue(Boolean(x));
            }
        } else {
            setValue(Boolean(values[props.name]));
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
                <IosSwitch {...props} checked={value} onChange={handleChange} />
            </Box>
        </div>
    );
}
