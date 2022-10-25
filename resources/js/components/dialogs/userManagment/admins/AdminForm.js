import React, { Fragment, useEffect, useState } from 'react';
import FormikInputLabel from '../../../Formik/FormikInputLabel';
import FormikInputPassword from '../../../Formik/FormikInputPassword';

import {
    Grid,
    makeStyles,

} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';

export default function AdminForm() {
    const { setFieldValue, status, isSubmitting, values } = useFormikContext();
    const { t } = useTranslation();
    return (

        <Grid container spacing={2}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
                <FormikInputLabel
                    name="full_name"
                    type="text"
                    size="small"
                    title={t('full_name')}
                    isRequired={true}
                />
            </Grid>

            <Grid item lg={4} md={4} sm={12} xs={12} >
                <FormikInputLabel
                    name="user_name"
                    type="text"
                    size="small"
                    title={t('user_name')}
                    isRequired={true}
                />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
                <FormikInputLabel
                    name="email"
                    type="text"
                    size="small"
                    title={t('email')}
                    isRequired={false}

                />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormikInputPassword
                    name="password"
                    type="text"
                    size="small"
                    title={t('password')}
                    isRequired={!status.edit}
                />
            </Grid>


            <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormikInputPassword
                    name="passwordConfirmation"
                    type="text"
                    size="small"
                    title={t('passwordConfirmation')}
                    isRequired={!status.edit}
                />
            </Grid>
          
        </Grid>

    );
}



