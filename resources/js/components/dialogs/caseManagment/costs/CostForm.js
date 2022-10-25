import React from 'react';
import FormikInputLabel from '../../../Formik/FormikInputLabel';
import ARFormikInputLabel from '../../../Formik/ARFormikInputLabel';
import FormilInputLabelNumber from '../../../Formik/FormilInputLabelNumber';
import FormikSelect from '../../../Formik/FormikSelect';
import {
    Grid,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';

export default function CostForm() {
    const { setFieldValue, status, isSubmitting, values } = useFormikContext();
    const { t } = useTranslation();
    return (

        <Grid container spacing={2}>
            <Grid item md={12} sm={12}>
                <FormikInputLabel
                    name="name"
                    type="text"
                    size="small"
                    title={t('name')}
                    isRequired={true}
                />
            </Grid>
            <Grid item md={12} sm={12}>
                <ARFormikInputLabel
                    name="ar_name"
                    type="text"
                    size="small"
                    title={t('ar_name')}
                    isRequired={true}
                />
            </Grid>

            
            <Grid item md={12} sm={12}>
                <FormilInputLabelNumber
                    name="value"
                    type="text"
                    size="small"
                    title={t('value')}
                />
            </Grid>


            <Grid item md={12} sm={12}>
                <FormikSelect
                    name="status"
                    type="text"
                    setFieldValue={setFieldValue}
                    size="small"
                    title={t('status')}
                    options={[
                        {
                            value: 'paid',
                            text: t('paid'),
                        },
                        { value: 'not_paid', text: t('not_paid') },


                    ]}
                />
            </Grid>

        </Grid>

    );
}



