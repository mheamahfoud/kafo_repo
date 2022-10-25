import React, { Fragment, useEffect, useState } from 'react';
import FormikInputLabel from '../../../Formik/FormikInputLabel';
import FormikInputFile from '../../../Formik/FormikInputFile';
import FormilInputLabelNumber from '../../../Formik/FormilInputLabelNumber';
import FormikSelect from '../../../Formik/FormikSelect';
import FormikDatePicker from '../../../Formik/FormikDatePicker';
import FormikMultiFileInput from '../../../Formik/FormikMultiFileInput';
import {
    Grid,
} from '@material-ui/core';
import { GetCountries } from '../../../../api/setUp/country';
import { GetCiteis } from '../../../../api/setUp/city';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';

export default function CloseCaseForm({ image_url ,images_url}) {
    const { setFieldValue, status, isSubmitting, values } = useFormikContext();
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const { t } = useTranslation();


    return (

        <Grid container spacing={2}>
           

            <Grid item lg={12} md={12} sm={12} xs={12} >
                <FormikInputLabel
                    name="description"
                    type="text"
                    size="small"
                    title={t('description')}
                    isRequired={true}
                />
            </Grid>
  

          

            <Grid item lg={12} md={12} sm={12} xs={12} >
                <FormikMultiFileInput
                    name="images"
                    setFieldValue ={setFieldValue }
                    images_url={images_url != undefined ? images_url : undefined}
                    isRequired={false}
                   // image_url={image_url != undefined ? image_url : undefined}
                    title={t('images')}

                />

            </Grid>

            

        </Grid>

    );
}



