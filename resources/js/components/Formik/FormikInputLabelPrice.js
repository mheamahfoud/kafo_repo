import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import NumberFormat from 'react-number-format';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import { globalSelector } from '../../redux/features/global_slice';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';

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
  const { lang } = useSelector(globalSelector)
  return <TextField
    //state.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    {...field} {...props}
    InputProps={{
      endAdornment: <InputAdornment position="start"> {lang == 'en' ? 'SYP' : 'ل.س'}</InputAdornment>,

    }}

    type="text"
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

export default function FormikInputLabelPrice({ title, isRequired, setFieldValue, ...props }) {
  const classes = useStyles();
  const { lang } = useSelector(globalSelector)
  const { errors, touched, values } = useFormikContext();
  const [value, setValue] = useState(0);
  const [value1, setValue1] = useState('');
  const currencyFormatter = new Intl.NumberFormat(lang == 'ar' ? 'en-US' : 'en-US', {
    style: 'currency',
    currency: 'SYP',
  });

  React.useEffect(
    () => {
      // alert(currencyFormatter.format(value1))
      if (lang == 'ar') {
        setValue(currencyFormatter.format(value1).replace('SYP', '').replace('.00', '').replace(/\s/g, ''))
        //  alert(currencyFormatter.format(value1))
      }

      else {
        setValue(currencyFormatter.format(value1).replace('SYP', '').replace('.00', '').replace(/\s/g, ''))

      }
    }, [value1]
  )
  useEffect(() => {
    if (props.name) {

      if (values[props.name] != undefined) {
        setValue1(values[props.name]);
      }
    }
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
      </Box>
      <Box>
        <Field
          type="text"
          className={classes.inputLabel}
          helperText={
            errors[props.name] && touched[props.name]
              ? errors[props.name]
              : props.helper
          }
          error={
            errors[props.name] && touched[props.name] ? true : false
          }
          value={value}
          onChange={(e) => {
            //alert(JSON.stringify(e.target.value.replace('SYP', '').replace('NAN', '').replace(',', '').replace(',', '').replace(',', '').replace(/\s/g, '')))
            setFieldValue(props.name, e.target.value.replace('SYP', '').replace('NAN', '').replace(',', '').replace(',', '').replace(',', '').replace('.00', '').replace(/\s/g, ''))
            ///  alert(e.target.value.replace('SYP', '').replace('NAN', '').replace(',', '').replace(',', '').replace(',', '').replace(/\s/g, ''))
            // setValue1(e.target.value.replace('SYP', '').replace('NAN', '').replace(',', '').replace(',', '').replace(',', '').replace(/\s/g, ''))
            setValue(currencyFormatter.format(e.target.value.replace('SYP', '').replace('NAN', '').replace(',', '').replace(',', '').replace(',', '').replace('.00', '').replace(/\s/g, '')).replace('SYP', '').replace('.00', '').replace(/\s/g, ''))
          }
          }
          {...props}
          component={FInput}
        />
      </Box>
    </div>
  );
}
