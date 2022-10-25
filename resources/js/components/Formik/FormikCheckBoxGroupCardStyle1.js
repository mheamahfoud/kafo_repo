import React, { Fragment, useEffect, useState } from 'react';
import {
    InputLabel,
    Box,
    makeStyles,
    Card,
    Grid,
    Collapse,
    Paper,
} from '@material-ui/core';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import {
    getProductionJobByPosition

} from '../../api/hr/team'
import { alertTitleClasses } from '@mui/material';
import IosSwitch from '../IosSwitch';
const useStyles = makeStyles((theme) => ({
    Circle: {
        height: '10px',
        width: '10px',
        backgroundColor: 'red',
        borderRadius: '50%',
        display: 'inline-block',
        margin: '3px',
        marginLeft: '12px',
    },
    inputLabel: {
        width: '100%',
        padding: '0px',
    },
    root: {
        display: 'flex',
    },
    formControl: {
        margin: '8px',
        width: '100%',
    },
    formLabel: {
        cursor: 'pointer',
        color: '#000000',
    },
    box_container: {
        width: '100%'
    },

    '@global': {

        '.wrapper': {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: '10px',
            gridAutoFlow: 'dense',
            listStyle: 'none',
            margin: '1em auto',
            padding: 0,
            maxWidth: '800px',
        },
        '.wrapper li': {
            border: '1px solid #ccc',
        },
        '.wrapper li fieldset': {
            display: 'block',
            objectFit: 'cover',
            width: '100%',
            height: '100%',
        },
    },
    paper: {
        height: 'auto',
        width: '100%',
        marginBottom: '10px',
    },
    grid: {
        padding: '24px',
        marginBottom: '10px',
    },
    collapse: {
        marginBottom: '10px',
    },
    paperHeader: {
        backgroundColor: '#9BC9CB',
        color: '#389497',
        fontWeight: 'bold',
        padding: '2px',
        paddingTop: '1px',
        textAlign: 'center',
        width: '15%',
        minWidth: '220px',
    },

    grid_items_padding_left: {
        paddingLeft: '15px',
    }
}));

export default function FormikCheckBoxGroupCardStyle1({
    isRequired,
    setFieldValue,
    name,
    title,
    collapse,
    position_id,
    ...props
}) {
    const classes = useStyles();
    const { t } = useTranslation();
    const [groupedOptions, setGroupedOptions] = useState({});
    const [groupedOpen, setGroupedOpen] = useState({});
    const { values, status } = useFormikContext();
    const [options, setOptions] = useState([]);
    const [counter, setCounter] = useState(1);
    React.useEffect(() => {
        if (status.edit && counter == 1) {
            getProductionJobByPosition({
                'positions_id': position_id
            }).then((response) => {
                setOptions(response.data)
                setFieldValue(`position_jobs.${parseInt(name.split('.')[1])}.options`, response.data);
            })
            setCounter(2)
        }
        else {
            if (position_id == undefined || position_id == null) return;
            getProductionJobByPosition({
                'positions_id': position_id
            }).then((response) => {
                setOptions(response.data)
                setFieldValue(`position_jobs.${parseInt(name.split('.')[1])}.options`, response.data);
                setFieldValue(`position_jobs.${parseInt(name.split('.')[1])}.jobs`, []);
            })
        }

    }, [position_id]);
    React.useEffect(() => {
        // if (options.length == 0) return;
        let obj = {};
        Object.keys(
            _.groupBy(options, function (option) {
                return option.position_id;
            }),
        ).map((position) => {
            obj[position] = collapse;
        });
        setGroupedOpen(obj);
    }, []);

    React.useEffect(() => {
        setGroupedOptions(
            _.groupBy(
                options.map((option) => {
                    return {
                        ...option,
                        checked:
                            values['position_jobs'][parseInt(name.split('.')[1])]['jobs'] &&
                            values['position_jobs'][parseInt(name.split('.')[1])]['jobs']
                                .includes(option.id),
                    };
                }),
                function (option) {
                    return option.position_id;
                },
            ),
        );


    }, [options, values['position_jobs'][parseInt(name.split('.')[1])]['jobs']]);

    const handleChange = (event) => {
        if (event.target.checked) {

            if (values['position_jobs'][parseInt(name.split('.')[1])]['jobs'])
                setFieldValue(`position_jobs.${parseInt(name.split('.')[1])}.jobs`, [...values['position_jobs'][parseInt(name.split('.')[1])]['jobs'], parseInt(event.target.value)]);
            else {
                setFieldValue(`position_jobs.${parseInt(name.split('.')[1])}.jobs`, Array.from([parseInt(event.target.value)]));
            }
            console.log(values['position_jobs'][parseInt(name.split('.')[1])]['jobs'])
        }
        else {
            const temp = values['position_jobs'][parseInt(name.split('.')[1])]['jobs'].filter(x => x != parseInt(event.target.value))
            setFieldValue(
                `position_jobs.${parseInt(name.split('.')[1])}.jobs`,
                temp
            );
        }


    };

    const handleCheckAll = () => {
        if (values['position_jobs'][parseInt(name.split('.')[1])]['jobs'] && values['position_jobs'][parseInt(name.split('.')[1])]['jobs'].length == options.length) {
            setFieldValue(`position_jobs.${parseInt(name.split('.')[1])}.jobs`, []);
        } else {
            setFieldValue(`position_jobs.${parseInt(name.split('.')[1])}.jobs`, options.map((option) => option.id));
        }
    };

    let checker = (arr, target) => target.every((v) => arr.includes(v));

    const handleCheckAllPosition = (position) => {

        //if (!values[name]) return;

        let pos_job = options
            .filter((el) => el.positions[0].name === position)
            .map((el) => el.id);

        // alert(JSON.stringify(pos_job))
        let allItemInChecked = checker(
            values[name].split(',').map(Number),
            pos_job,
        );
        //   alert(JSON.stringify(allItemInChecked))
        let arrWithPos = [];
        if (allItemInChecked) {
            arrWithPos = values[name]
                .split(',')
                .map(Number)
                .filter((v) => !pos_job.includes(v));
            //setFieldValue(name, arrWithPos.join());
        } else {
            arrWithPos = new Set([
                ...(values[name].length !== 0
                    ? values[name].split(',').map(Number)
                    : []),
                ...pos_job,
            ]);
        }
        setFieldValue(name, [...arrWithPos].join());

    };

    const handleToggleOpenGroup = (position) => {
        setGroupedOpen({ ...groupedOpen, [position]: !groupedOpen[position] });
    };
    const expand = () => {
        // alert('5')
    }
    return (
        <div style={{ width: '100%' }}>
            {/* <Box display="flex">
                <Box>
                    <InputLabel
                        style={{
                            color: 'black',
                            width: 'auto',
                        }}
                    >
                        <FormControlLabel

                            control={
                                <Checkbox
                                    checked={
                                        values['position_jobs'][parseInt(name.split('.')[1])]['jobs'] &&values['position_jobs'][parseInt(name.split('.')[1])]['jobs'].length!= 0 &&
                                        values['position_jobs'][parseInt(name.split('.')[1])]['jobs'].length == options.length
                                    }
                                    onChange={handleCheckAll}


                                />
                            }
                            label={
                                <Box
                                    style={{ textAlign: 'center' }}
                                >
                                    {title}     <span style={{ backgroundColor: '#389497', padding: '3px', width: '45px', display: 'inline-block' }}>
                                        {values['position_jobs'][parseInt(name.split('.')[1])]['jobs'] ?
                                            values['position_jobs'][parseInt(name.split('.')[1])]['jobs']
                                                .length : 0}


                                        /{options.length}
                                    </span>
                                </Box>
                            }
                        />

                    </InputLabel>
                </Box>
                {isRequired && (
                    <Box>
                        <Card className={classes.Circle}></Card>
                    </Box>
                )}
            </Box> */}
            <Box display="flex">
                <Box className={classes.box_container}>
                    {/* //  {[0, 1, 2].map((i) => ( */}
                    {/* // <Grid item sm={4} key={i}> */}
                    {Object.entries(groupedOptions).map(
                        ([position, objValues], index) =>
                            // <Paper elevation={5} className={classes.paper}>
                            //     <Fragment>


                            <Grid container spacing={2} className={classes.grid_items_padding_left}>
                                {/* <FormGroup> */}
                                {objValues.map(
                                    (value, i) => (
                                        <Grid item sm={6} lg={3} xs={12} md={3} >
                                            <FormControlLabel
                                                key={i}
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            value.checked
                                                        }
                                                        onChange={
                                                            handleChange
                                                        }
                                                        name={
                                                            value.checked
                                                        }
                                                        value={
                                                            value.id
                                                        }
                                                    />
                                                }
                                                label={
                                                    value.name
                                                }
                                            />
                                        </Grid>
                                    ),
                                )}
                                {/* </FormGroup> */}




                            </Grid>

                        //     </Fragment>
                        // </Paper>

                    )}

                    {/* </Grid> */
                        // )
                        //)
                    }

                </Box>
            </Box>
        </div >
    );
}
