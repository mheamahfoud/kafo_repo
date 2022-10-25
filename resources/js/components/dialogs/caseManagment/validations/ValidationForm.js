import React, { Fragment, useEffect, useState } from 'react';
import FormikInputLabel from '../../../Formik/FormikInputLabel';
import ARFormikInputLabel from '../../../Formik/ARFormikInputLabel';

import FormikInputFile from '../../../Formik/FormikInputFile';
import FormilInputLabelNumber from '../../../Formik/FormilInputLabelNumber';
import FormikSelect from '../../../Formik/FormikSelect';
import FormikDatePicker from '../../../Formik/FormikDatePicker';
import FormikMultiFileInput from '../../../Formik/FormikMultiFileInput';
import {
    Grid,
} from '@material-ui/core';

import { GetValidationTypesSelectList } from '../../../../api/setUp/ValidationType';
import { GetProvidersSelectList } from '../../../../api/setUp/provider';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import FormikInputTextArea from '../../../Formik/FormikInputTextArea';
import ARFormikInputTextArea from '../../../Formik/ARFormikInputTextArea';
export default function ValidationForm({ image_url, images_url }) {
    const { setFieldValue, status, isSubmitting, values } = useFormikContext();
    const [types, setTypes] = useState([]);
    const [providers, setProviders] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        GetValidationTypesSelectList().then((res) =>setTypes(res.data) )
            
        GetProvidersSelectList().then((res) =>setProviders(res.data) )

    }, [])
    return (

        <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12} >
                <FormikInputLabel
                    name="name"
                    type="text"
                    size="small"
                    title={t('name')}
                    isRequired={true}
                />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} >
                <ARFormikInputLabel
                    name="ar_name"
                    type="text"
                    size="small"
                    title={t('ar_name')}
                    isRequired={true}
                />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} >
                <FormikSelect
                    name="type_id"
                    isRequired={true}
                    type="text"
                    size="small"
                    title={t('type')}
                    options={types}
                />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} >
                <FormikSelect
                    name="status"
                    isRequired={true}
                    type="text"
                    setFieldValue={setFieldValue}
                    size="small"
                    title={t('status')}
                    options={[
                        {
                            value: 'valid',
                            text: t('valid'),
                        },
                        { value: 'not_valid', text: t('not_valid') },


                    ]}
                />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} >
                <FormikSelect
                    name="provider_id"
                    type="text"
                    size="small"
                    title={t('provider')}
                    options={providers}
                />
            </Grid>
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
                <FormikMultiFileInput
                    name="images"
                    setFieldValue={setFieldValue}
                    images_url={images_url != undefined ? images_url : undefined}
                    isRequired={true}
                    // image_url={image_url != undefined ? image_url : undefined}
                    title={t('images')}

                />

            </Grid>



        </Grid>

    );
}



