import React , {useState,useEffect} from 'react';
import FormikInputLabel from '../../../Formik/FormikInputLabel';
import ARFormikInputLabel from '../../../Formik/ARFormikInputLabel';
import FormikSelect from '../../../Formik/FormikSelect';

import {
    Grid,


} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import { GetCountries } from '../../../../api/setUp/country';


export default function CityForm() {
    const { setFieldValue, status, isSubmitting, values } = useFormikContext();
    const { t } = useTranslation();
    const [countries, setCountries] = useState([]);
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

    }, [])
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
            <Grid item lg={12} md={12} sm={12} xs={12} >

                <FormikSelect
                    name="country_id"
                    type="text"
                    size="small"
                    title={t('country')}
                    options={countries}
                    isRequired={true}
                />
            </Grid>
        </Grid>

    );
}



