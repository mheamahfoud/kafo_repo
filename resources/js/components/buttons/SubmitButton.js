import { Button, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import React from 'react';
import { mainColor } from '../../config/constants';
const useStyles = makeStyles((theme) => ({
    SubmitBtn: {
        backgroundColor: mainColor,
        color: 'white',
        borderRadius: 30,
        outline: 'none',
        fontSize: '12px',
        width: '10%',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'green',
        },
    },

}));
const SubmitButton = (props ) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { setFieldValue, values, isSubmitting, status } = useFormikContext();
    React.useEffect(
        () => {
         

        }, [props.isSubmitting])
    return (

        <Button
            className={classes.SubmitBtn}
            disabled={props.isSubmitting}
            type="submit"
        >
            {props.isSubmitting && 'Loading'}
            {!props.isSubmitting && !status.edit && 'Create'}
            {!props.isSubmitting && status.edit && 'Update'}
        </Button>
    )
}

export default SubmitButton;