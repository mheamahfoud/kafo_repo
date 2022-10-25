import React, { useState, useEffect, Fragment } from 'react';
import { Formik, Field } from 'formik';
import { LoginAuth } from '../api/auth';
import { LoginAuth2 } from '../api/auth2';

import { Paper, Grid, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        height: '100%',
        backgroundImage: 'linear-Gradient(#0c7c80, #073D3F)',
        borderRadius: '0px',
        textAlign: 'center',
        [theme.breakpoints.up('xs')]: {
            paddingLeft: '20%',
            paddingTop: '40px',
            paddingBottom: '40px',
            paddingRight: '20%',
        },
        [theme.breakpoints.down('xs')]: {
            paddingLeft: '10%',
            paddingTop: '40px',
            paddingBottom: '40px',
            paddingRight: '10%',
        },
    },
    Loginpaper: {
        [theme.breakpoints.up('xs')]: {
            width: '560px',
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        height: 'auto',
        backgroundColor: 'white',
        textAlign: 'center',
        paddingLeft: '22px',
        paddingRight: '22px',
        boxShadow: '8px 7px 17px',
        justifyContent: 'ecneter',
    },
    image: {
        height: '200px',
        '&:hover ': {
            '&.logo-image img': {},
        },
    },
    buttonProgress: {
        color: '#fff',
    },
    SignIn: {
        backgroundColor: '#0e8e93',
        color: 'white',
        textTransform: 'capitalize',
        fontFamily: 'Arial',
        width: '180px',
        marginBottom: '8px',
        textTransform: 'capitalize',
        fontFamily: 'Arial',
        borderRadius: 30,
        '&:hover': {
            backgroundColor: '#0e8e93',
        },
        cardCont: {},
    },
}));

const TextFieldForm = ({ field, form, ...props }) => {
    return (
        <StyledTextField
            {...field}
            variant="outlined"
            size="small"
            {...props}
        />
    );
};

const StyledTextField = styled(TextField)`
    .MuiOutlinedInput-root {
        border-radius: 25px;
        fieldset {
            legend {
                font-size: 1.3em;
            }
        }
    }
    label.MuiInputLabel-outlined.MuiInputLabel-marginDense {
        font-size: 20px;
        &.MuiFormLabel-filled {
            transform: translate(14px, -13px) scale(1);
        }
    }
    .MuiInputLabel-outlined.MuiInputLabel-marginDense {
        transform: translate(14px, 8px) scale(1);
    }
    .MuiInputLabel-outlined.MuiInputLabel-shrink {
        transform: translate(14px, -13px) scale(1);
    }
`;

export default function Login() {
    const [imageurl, setimageurl] = useState(
        '/uploads/DubtechLogo.svg',
    );
    const [MouseOut, setMouseOut] = useState(false);
    const urlhandelchange = () => {
        setMouseOut(true);
        setimageurl('/uploads/DubtechName.svg');
    };
    const urlhandelchangeout = () => {
        setMouseOut(false);
        setimageurl('/uploads/DubtechLogo.svg');
    };
    const [responeMsg, setResponeMsg] = useState();
    const classes = useStyles();
    return (
        <Fragment>
            <Grid
                container
                style={{
                    justifyContent: 'center',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <Paper className={classes.Loginpaper}>
                    <Grid container>
                        <Grid
                            item
                            lg={12}
                            xs={12}
                            md={12}
                            sm={12}
                            className={classes.image}
                            onMouseOver={urlhandelchange}
                            onMouseOut={urlhandelchangeout}
                        >
                            <img
                                style={{ height: '100%', width: '90%' }}
                                src={imageurl}
                                className={'logo-image'}
                            />
                        </Grid>
                        <Grid
                            item
                            lg={12}
                            xs={12}
                            md={12}
                            sm={12}
                            style={{ paddingTop: '4px' }}
                        >
                            <label
                                style={{
                                    textAlign: 'center',
                                    fontSize: '45px',
                                    fontWeight: 'bold',
                                    fontFamily: 'arial',
                                    color: '#6e6565',
                                }}
                            >
                                Sign in
                            </label>
                        </Grid>
                        <Grid item lg={12} md={12} xs={12} sm={12}>
                            <hr
                                style={{
                                    backgroundColor: '#000000',
                                    width: '250px',
                                    marginTop: '-16px',
                                }}
                            ></hr>
                        </Grid>
                        <Formik
                            initialValues={{ username: '', password: '' }}
                            onSubmit={async (values) => {
                                if (values.username && values.password) {
                        
                                    // LoginAuth(
                                    //     values.username,
                                    //     values.password,
                                    //     'false',
                                    // ).then((result) => {
                                    //     if (result.success) {
                                    //         console.log(result)
                                    //       //  alert(JSON.stringify(result))
                                    //       //  setResponeMsg();
                                    //        // window.location.href = '/home';
                              
                                       
                                    //     } else {
                                    //         setResponeMsg(result.message);
                                    //     }
                                    // });
                                    window.location.href = '/';
                                    // LoginAuth2(
                                    //     values.username,
                                    //     values.password,
                                    //     'false',
                                    // ).then((result) => {
                                    //     if (!result.error_code) {
                                    //         localStorage.setItem("token", JSON.stringify(result.data.token));
                                    //         localStorage.setItem("UserId", JSON.stringify(result.data.user.id));
                                    //        // setResponeMsg();
                                    //        window.location.href = '/';
                                    //     // alert(JSON.stringify(result.data.token))
                                      
                                    //     } 
                                    //     else{
                                    //         setResponeMsg(result.error_description);
                                    //     }
                                    // });
                                    // await new Promise((resolve) =>
                                    //     setTimeout(resolve, 1000),
                                    // );
                                } else {
                                    setResponeMsg(
                                        'Please enter valid username and password',
                                    );
                                }
                            }}
                        >
                            {(props) => {
                                const {
                                    values,
                                    touched,
                                    errors,
                                    isSubmitting,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                } = props;
                                return (
                                    <form
                                        onSubmit={handleSubmit}
                                        style={{ width: '100%' }}
                                    >
                                        <Grid
                                            item
                                            lg={12}
                                            md={12}
                                            xs={12}
                                            sm={12}
                                            style={{ paddingTop: '12px' }}
                                        >
                                            <Field
                                                name="username"
                                                style={{ width: '64%' }}
                                                id="Username"
                                                type="text"
                                                label="Username"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                component={TextFieldForm}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            lg={12}
                                            md={12}
                                            xs={12}
                                            sm={12}
                                            style={{ paddingTop: '25px' }}
                                        >
                                            <Field
                                                name="password"
                                                style={{
                                                    width: '64%',
                                                    fontSize: '0.95em',
                                                }}
                                                type="text"
                                                label="Password"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                              
                                                component={TextFieldForm}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            lg={12}
                                            md={12}
                                            xs={12}
                                            sm={12}
                                            style={{
                                                textAlign: 'start',
                                                paddingLeft: '16%',
                                                color: '#0c7c80',
                                                fontWeight: 'bold',
                                                marginTop: '5px',
                                            }}
                                        >
                                            {responeMsg && (
                                                <label
                                                    style={{
                                                        width: '76%',
                                                        fontFamily: 'arial',
                                                        fontSize: '16px',
                                                        color: 'red',
                                                    }}
                                                >
                                                    {responeMsg}
                                                </label>
                                            )}
                                            <label
                                                style={{
                                                    width: '76%',
                                                    fontFamily: 'arial',
                                                    fontSize: '16px',
                                                }}
                                            >
                                                forget password?
                                            </label>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={12}
                                            md={12}
                                            xs={12}
                                            sm={12}
                                            style={{ textAlign: 'center' }}
                                        >
                                            <Button
                                                className={classes.SignIn}
                                                size="small"
                                                type="submit"
                                                disabled={isSubmitting}
                                                style={{
                                                    outline: 'none',
                                                    marginBottom: '36px',
                                                    marginTop: '33px',
                                                    fontSize: '16px',
                                                    fontWeight: 'bold',
                                                    textTransform: 'none',
                                                }}
                                            >
                                                {!isSubmitting && 'Sign in'}
                                                {isSubmitting && (
                                                    <CircularProgress
                                                        size={24}
                                                        className={
                                                            classes.buttonProgress
                                                        }
                                                    />
                                                )}
                                            </Button>
                                        </Grid>
                                    </form>
                                );
                            }}
                        </Formik>
                    </Grid>
                </Paper>
            </Grid>
        </Fragment>
    );
}
