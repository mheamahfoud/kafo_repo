import React, { Fragment, useEffect, useState } from 'react';
import FormikInputLabel from '../../../Formik/FormikInputLabel';
//import FormikInputFile from '../../../Formik/FormikInputFile';
import FormikSingleInputFile from '../../../Formik/FormikSingleInputFile';
import ARFormikInputLabel from '../../../Formik/ARFormikInputLabel';

import {
    Grid,
} from '@material-ui/core';

import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import FormikInputTextArea from '../../../Formik/FormikInputTextArea';
import ARFormikInputTextArea from '../../../Formik/ARFormikInputTextArea';
export default function ProviderForm({ image_url }) {
    const { setFieldValue, status, isSubmitting, values } = useFormikContext();
    const { t } = useTranslation();

    return (

        <Grid container spacing={2}>
            <Grid item md={6} sm={12} xs={12}>
                <FormikInputLabel
                    name="name"
                    type="text"
                    size="small"
                    title={t('name')}
                    isRequired={true}
                />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
                <ARFormikInputLabel
                    name="ar_name"
                    type="text"
                    direction="rtl"
                    size="small"
                    title={t('ar_name')}
                    isRequired={true}
                />
            </Grid>


            <Grid item md={12} sm={12} xs={12}>
                <FormikInputTextArea
                    name="description"
                    type="text"
                    size="small"
                    title={t('description')}

                />
            </Grid>

            <Grid item md={12} sm={12} xs={12}>
                <ARFormikInputTextArea
                    name="ar_description"
                    direction="rtl"
                    type="text"
                    size="small"
                    title={t('ar_description')}

                />
            </Grid>
            <Grid item md={12} sm={12} xs={12}>


                <FormikSingleInputFile
                    name="image"
                    isRequired={false}
                    image_url={image_url != undefined ? image_url : undefined}
                    title={t('image')}
                    setFieldValue={setFieldValue}
                />

            </Grid>



        </Grid>

    );
}



