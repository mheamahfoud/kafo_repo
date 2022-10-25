import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import NumberFormat from 'react-number-format';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';

import React, { useEffect, useState } from 'react';
import {
    TextField,
    InputLabel,
    Box,
    makeStyles,
    Card,
} from '@material-ui/core';
// import PhoneInput from 'react-phone-input';
// import 'react-phone-input/lib/style.css'
import { Field, useFormikContext } from 'formik';


const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(#00) 000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  });
  
  TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  
  const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  });
  
  NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };


const FInput = ({ field, form, ...props }) => {
    const [values, setValues] = React.useState({
        textmask: '(100) 000-0000',
        numberformat: '1320',
      });
      const handleChange = (event) => {
        setValues({
          ...values,
          [event.target.name]: event.target.value,
        });
      };
    return  <TextField

    {...field} {...props} 
    type={'number'}
  
   
    variant="standard"
  />

  
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

export default function FormilInputLabelNumber({ title, isRequired, ...props }) {
    const classes = useStyles();
    const { errors, touched } = useFormikContext();
    const [value, setValue] = useState();
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
                    className={classes.inputLabel}
                    helperText={
                        errors[props.name] && touched[props.name]
                            ? errors[props.name]
                            : props.helper
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
