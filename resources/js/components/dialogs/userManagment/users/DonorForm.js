import React, { Fragment, useEffect, useState } from 'react';
import FormikInputLabel from '../../../Formik/FormikInputLabel';
import FormikSingleInputFile from '../../../Formik/FormikSingleInputFile';
import FormilInputLabelNumber from '../../../Formik/FormilInputLabelNumber';
import FormikSelect from '../../../Formik/FormikSelect';
import FormikDatePicker from '../../../Formik/FormikDatePicker';
import {
    Grid,
} from '@material-ui/core';
import { GetCountries } from '../../../../api/setUp/country';
import { GetCiteis } from '../../../../api/setUp/city';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';

export default function DonorForm({ image_url }) {
    const { setFieldValue, status, isSubmitting, values } = useFormikContext();
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        GetCountries().then((res) => {
            setCountries(
                res.data.data.filter(x => x.is_active).map(
                    (country) => {
                        return { "value": country.id, "text": country.name }
                    }
                )
            )
        })
        GetCiteis().then((res) => {
            setCities(
                res.data.data.filter(x => x.is_active).map(
                    (city) => {
                        return { "value": city.id, "text": city.name, "country_id": city.country_id }
                    }
                )
            )
        })
    }, [])

    return (

        <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12} >
                <FormikInputLabel
                    name="full_name"
                    type="text"
                    size="small"
                    title={t('full_name')}
                    isRequired={true}
                />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} >
                <FormikInputLabel
                    name="secret_name"
                    type="text"
                    size="small"
                    isRequired={true}
                    title={t('secret_name')}
                />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} >
                <FormilInputLabelNumber
                    name="mobile"
                    type="text"
                    size="small"
                    title={t('phone_number')}
                />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} >
                <FormikInputLabel
                    name="email"
                    type="text"
                    size="small"
                    title={t('email')}
                    isRequired={false}

                />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12} >
                <FormikSelect
                    name="gender"
                    type="text"
                    setFieldValue={setFieldValue}
                    size="small"
                    title={t('gender')}
                    options={[
                        {
                            value: 'Female',
                            text: 'Female',
                        },
                        { value: 'Male', text: 'Male' },


                    ]}
                />
            </Grid>



            <Grid item lg={6} md={6} sm={12} xs={12} >

                <FormikSelect
                    name="country_id"
                    type="text"
                    size="small"
                    title={t('country')}
                    options={countries}
                />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} >
                <FormikSelect
                    name="city_id"
                    type="text"
                    size="small"
                    title={t('city')}
                    options={values?.country_id ? cities.filter(x => x.country_id == values?.country_id) : []}
                />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} >
                <FormikDatePicker
                    name="birth_date"
                    setFieldValue={setFieldValue}
                    isRequired={false}
                    title={t('birth_date')}
                />

            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12} >

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



