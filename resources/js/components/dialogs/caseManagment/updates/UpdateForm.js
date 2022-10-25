import React, { Fragment, useEffect, useState } from 'react';
import FormikInputLabel from '../../../Formik/FormikInputLabel';
import FormikInputFile from '../../../Formik/FormikInputFile';
import FormikMultiFileInput from '../../../Formik/FormikMultiFileInput';
import {
    Grid,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import FormikInputTextArea from '../../../Formik/FormikInputTextArea';
import ARFormikInputTextArea from '../../../Formik/ARFormikInputTextArea';

export default function UpdateForm({ image_url ,images_url}) {
    const { setFieldValue, status, isSubmitting, values } = useFormikContext();
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const { t } = useTranslation();


    return (

        <Grid container spacing={2}>


            <Grid item lg={12} md={12} sm={12} xs={12} >
                <FormikInputTextArea
                    name="description"
                    type="text"
                    size="small"
                    title={t('description')}
                    isRequired={true}
                />
            </Grid>
  
            <Grid item lg={12} md={12} sm={12} xs={12} >
                <ARFormikInputTextArea
                    name="ar_description"
                    type="text"
                    size="small"
                    title={t('ar_description')}
                    isRequired={true}
                />
            </Grid>
           

            <Grid item lg={12} md={12} sm={12} xs={12} >
                         
            <FormikInputFile
                    name="medias"
                    isRequired={false}
                    image_url={image_url!=undefined ?image_url : undefined}
                    title={t('image')}
                    setFieldValue={setFieldValue}
                />

            

            </Grid>

            

        </Grid>

    );
}



