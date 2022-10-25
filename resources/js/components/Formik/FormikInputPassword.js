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
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';
const FInput = ({ field, form, ...props }) => {
    const { errors, touched } = useFormikContext();
    const [values, setValues] = React.useState({
        showPassword: false,
    });
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return <TextField  {...field} {...props}
        // helperText={'password not change'}

        type={values.showPassword ? 'password' : 'text'}
        InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                    >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            )
        }} />;

    // <Input
    //     id="standard-adornment-password"
    //     {...field}
    //     {...props}
    //     helperText={'tttt'}
    //     type={values.showPassword ? 'text' : 'password'}
    //     // value={values.password}


    //     endAdornment={
    //         <InputAdornment position="end">
    //             <IconButton
    //                 aria-label="toggle password visibility"
    //                 onClick={handleClickShowPassword}
    //                 onMouseDown={handleMouseDownPassword}
    //             >
    //                 {values.showPassword ? <VisibilityOff /> : <Visibility />}
    //             </IconButton>
    //         </InputAdornment>
    //     }
    // />



};

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
        marginTop: '3px',
        padding: '0px',

    },
}));

export default function FormikInputPassword({ title, isRequired, ...props }) {
    const classes = useStyles();
    const { errors, touched, status } = useFormikContext();
    const [value, setValue] = useState();
    const { t } = useTranslation();
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
                <FastField
                    className={classes.inputLabel}
                    helperText={
                        errors[props.name] && touched[props.name]
                            ? errors[props.name]
                            : status.edit && props.name == 'password' ? t('change_password'): null
                            
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
