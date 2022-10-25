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

import { GetValidationTypes } from '../../../../api/setUp/ValidationType';
import { GetProvidersSelectList } from '../../../../api/setUp/provider';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import FormikInputTextArea from '../../../Formik/FormikInputTextArea';
import { GetRelationsSelectList } from '../../../../api/setUp/relation';
export default function SecretInfoForm({ image_url, images_url }) {
    const { setFieldValue, status, isSubmitting, values } = useFormikContext();
    const [providers, setProviders] = useState([]);
    const { t } = useTranslation();
    const [relations, setRelations] = useState([]);
    useEffect(() => {
        GetRelationsSelectList().then((res) => setRelations(res.data))
        GetProvidersSelectList().then((res) => setProviders(res.data))
    }, [])
    return (

        <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12} >
                <FormikInputLabel
                    name="person_name"
                    type="text"
                    size="small"
                    title={t('person_name')}
                    isRequired={false}
                />
            </Grid>


            <Grid item lg={6} md={6} sm={12} xs={12} >
                <FormikInputLabel
                    name="relation_name"
                    type="text"
                    size="small"
                    title={t('relation_name')}
                />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12} >

                <FormikSelect
                    name="relation_id"
                    type="text"
                    size="small"
                    title={t('relation')}
                    options={relations}
                />

            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} >
                <FormilInputLabelNumber
                    name="phone_number"
                    type="text"
                    size="small"
                    title={t('phone_number')}
                />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} >
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
                    name="address"
                    type="text"
                    size="small"
                    title={t('address')}
                    isRequired={false}
                />
            </Grid>



            <Grid item lg={12} md={12} sm={12} xs={12} >
                <FormikInputTextArea
                    name="note"
                    type="text"
                    size="small"
                    title={t('note')}
                    isRequired={false}
                />
            </Grid>







        </Grid>

    );
}



