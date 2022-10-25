import React, { Fragment , useEffect  ,useState} from 'react';
import FormikInputLabel from '../../../components/Formik/FormikInputLabel'
import FormikSelect from '../../../components/Formik/FormikSelect';
import { useSnackbar } from 'notistack';
import {
    Grid,

    makeStyles,

} from '@material-ui/core';



import { connect } from 'react-redux';
import { Field } from 'formik';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
    },
    SubmitBtn: {
        backgroundColor: '#0e8e93',
        color: 'white',
        height: '32px',
        marginBottom: '8px',
        borderRadius: 30,
        outline: 'none',
        fontSize: '12px',
        width: '10%',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#02676b',
        },
    },
    ResetBtn: {
        backgroundColor: 'red',
        color: 'white',
        height: '32px',
        marginBottom: '8px',
        borderRadius: 30,
        outline: 'none',
        fontSize: '12px',
        width: '10%',
        textTransform: 'none',
    },
}));
import { FieldArray, useFormikContext } from 'formik';
export  default function JobForm() {

    const { setFieldValue, status, isSubmitting, values } = useFormikContext();
   

    const handleClick = () => {

    }



    

    return (

        <Grid container spacing={2}>
            <Grid item md={12} sm={12}>
                <FormikInputLabel
                    name="name"
                    type="text"
                    size="small"
                    title="Name"
                    isRequired={true}
                />
            </Grid>
            <Grid item md={12} sm={12}>
                <FormikSelect
                    name="type"
                    type="text"
                    size="small"
                    title="Type"
                    setFieldValue={setFieldValue}
                    options={[
                        {
                            value: 'administrative',
                            text: 'administrative',
                        },
                        { value: 'production', text: 'production' },
                        { value: 'service', text: 'service' },
                        { value: 'permission', text: 'permission' },
                    ]}
                />
            </Grid>

           
        </Grid>

    );
}


