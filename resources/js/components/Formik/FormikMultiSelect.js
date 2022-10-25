import React, { useEffect, useState } from 'react';
import {
    InputLabel,
    TextField,
    Box,
    makeStyles,
    Card,
} from '@material-ui/core';
import { Field, useFormikContext } from 'formik';
import { Autocomplete } from '@material-ui/lab';
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
    },
}));

export default function FormikMultiSelect({
    title,
    isRequired,
    setFieldValue,
    rightAdd,
   
    ...props
}) {
    const classes = useStyles();
    const { t } = useTranslation();
    const [value, setValue] = useState([]);
    const { values, errors, touched } = useFormikContext();

    useEffect(() => {
        let pName = props.name.split('.')[0];
        if (
            values[pName] == undefined ||
            values[pName] == null ||
            props.options.length == 0
        ) {
            setValue([]);
            return;
        }

        if (props.name.includes('.')) {
            if (
                values[props.name.substr(0, props.name.indexOf('.'))] !=
                undefined
            ) {
                let x = values;
                props.name.split('.').map((item) => {
                    x = x[item];
                });
                if (x == undefined) return;

                let tmpValue = [];
                x.split(',').map((item) => {
                    tmpValue.push(
                        props.options[
                        props.options
                            .map((e) => e.value.toString())
                            .indexOf(item.toString())
                        ],
                    );
                });
                setValue(tmpValue);
            }
        } else {
            let tmpValue = [];
            console.log(values[props.name])
            values[props.name].split(',').map((item) => {
                tmpValue.push(
                    props.options[
                    props.options
                        .map((e) => e.value.toString())
                        .indexOf(item.toString())
                    ],
                );
            });
            setValue(tmpValue);
        }
    }, [values[props.name.split('.')[0]], props.options]);

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
                    {/* ///props.options.length != 0 */}
                    {true && (
                        <Field
                            {...props}
                            className={classes.inputLabel}
                            component={Autocomplete}
                            multiple
                            disableCloseOnSelect
                            filterSelectedOptions
                            getOptionLabel={(option) =>
                                option ? t(option.text) : null
                            }
                            size="small"
                            getOptionSelected={(option, valuex) => {
                                if (valuex == undefined || valuex.value == '') {
                                    setValue([]);
                                    return false;
                                }
                                return valuex.value === option.value;
                            }}
                            value={value}
                            renderOption={(option) => (
                                <React.Fragment>
                                    {
                                        <div style={{ display: 'flex' }}>
                                            {option.text + ' - ' + option.mobile_number}
                                        </div>}


                                </React.Fragment>
                            )}
                            onChange={(event, newValue) => {
                                if (_.some(newValue, ['value', 'check_all'])) {
                                    setValue(props.options);
                                    setFieldValue(
                                        props.name,
                                        props.options.filter(x=>x.value!='check_all')
                                            .map((item) => item.value)
                                            .toString(),
                                    );
                                }
                                else{
                                    setValue(newValue);
                                    setFieldValue(
                                        props.name,
                                        newValue
                                            .map((item) => item.value)
                                            .toString(),
                                    );
                                }
                                  
                              
                               
                            }}
                            renderInput={(params) => (
                                <TextField
                                    helperText={
                                        errors[props.name] &&
                                            touched[props.name]
                                            ? errors[props.name]
                                            : null
                                    }
                                    error={
                                        errors[props.name] &&
                                            touched[props.name]
                                            ? true
                                            : false
                                    }
                                    {...params}
                                />
                            )}

                        />
                    )}
                </Box>
                <Box>{rightAdd}</Box>
            </Box>
        </div>
    );
}
