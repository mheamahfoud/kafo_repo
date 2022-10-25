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

export default function FormikCheckBoxGroupNewStyle({
    isRequired,
    setFieldValue,
    name,
    options,
    title,
    collapse,
    ...props
}) {
    const classes = useStyles();
    const { t } = useTranslation();
    const [groupedOptions, setGroupedOptions] = useState({});
    const [groupedOpen, setGroupedOpen] = useState({});
    const { values } = useFormikContext();

    React.useEffect(() => {
        if (options.length == 0) return;
        let obj = {};
        Object.keys(
            _.groupBy(options, function (option) {
                return option.position_name;
            }),
        ).map((position) => {
            obj[position] = collapse;
        });
        setGroupedOpen(obj);
    }, []);

    React.useEffect(() => {
        if (options.length == 0) return;
        setGroupedOptions(
            _.groupBy(
                options.map((option) => {
                    return {
                        ...option,
                        checked:
                            values[name] &&
                            values[name]
                                .split(',')
                                .includes(option.id.toString()),
                    };
                }),
                function (option) {
                    return option.position_name;
                },
            ),
        );
    }, [options, values[name]]);

    const handleChange = (event) => {
        if (event.target.checked) {
            if (values[name])
                setFieldValue(name, values[name] + ',' + event.target.value);
            else {
                console.log(groupedOpen)
                setFieldValue(name, event.target.value);
                console.log('groupedOpen')
                console.log(groupedOpen)
            }

            //event.target.value
        }
         else {
            setFieldValue(
                name,
                _.filter(values[name] && values[name].split(','), function (n) {
                    return n != event.target.value;
                }).join(','),
            );
        }


    };

    const handleCheckAll = () => {
        if (values[name] && values[name].split(',').length == options.length) {
            setFieldValue(name, '');
        } else {
            setFieldValue(name, options.map((option) => option.id).join());
        }
    };

    let checker = (arr, target) => target.every((v) => arr.includes(v));

    const handleCheckAllPosition = (position) => {

        //if (!values[name]) return;

        let pos_job = options
            .filter((el) => el.position_name === position)
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
            <Box display="flex">
                <Box>
                    <InputLabel
                        style={{
                            color: 'black',
                            width: 'auto',
                        }}
                    >
                        {title}
                        <Checkbox
                            checked={
                                values[name] &&
                                values[name].split(',').length == options.length
                            }
                            onChange={handleCheckAll}
                        />
                    </InputLabel>
                </Box>
                {isRequired && (
                    <Box>
                        <Card className={classes.Circle}></Card>
                    </Box>
                )}
            </Box>
            <Box display="flex">
                <Box className={classes.box_container}>
                    {/* //  {[0, 1, 2].map((i) => ( */}
                    {/* // <Grid item sm={4} key={i}> */}
                    {Object.entries(groupedOptions).map(
                        ([position, objValues], index) =>
                            <Paper elevation={5} className={classes.paper}>
                                <Fragment>
                                    <Grid container>
                                        <Grid container item xs={5}>
                                            <Box display="flex">
                                                <div className={classes.paperHeader}>
                                                    <p
                                                        style={{
                                                            height: 'fit-content',
                                                            fontSize: '1.1rem',
                                                            padding: '3px',
                                                            fontWeight: 900,
                                                            marginBottom: '0rem',
                                                        }}
                                                    >
                                                        {
                                                            position
                                                        }
                                                    </p>
                                                </div>

                                                <Box padding='5px'>
                                                    <IosSwitch
                                                        checked={
                                                            values[name] &&
                                                            checker(
                                                                values[name]
                                                                    .split(',')
                                                                    .map(
                                                                        Number,
                                                                    ),
                                                                options
                                                                    .filter(
                                                                        (el) =>
                                                                            el.position_name ===
                                                                            position,
                                                                    )
                                                                    .map(
                                                                        (el) =>
                                                                            el.id,
                                                                    ),
                                                            )
                                                        }
                                                        onChange={() =>
                                                            handleCheckAllPosition(
                                                                position,
                                                            )
                                                        }
                                                    />
                                                    {/* <Checkbox
                                                        checked={
                                                            values[name] &&
                                                            checker(
                                                                values[name]
                                                                    .split(',')
                                                                    .map(
                                                                        Number,
                                                                    ),
                                                                options
                                                                    .filter(
                                                                        (el) =>
                                                                            el.position_name ===
                                                                            position,
                                                                    )
                                                                    .map(
                                                                        (el) =>
                                                                            el.value,
                                                                    ),
                                                            )
                                                        }
                                                        onChange={() =>
                                                            handleCheckAllPosition(
                                                                position,
                                                            )
                                                        }
                                                    /> */}
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid
                                            container
                                            item
                                            xs={5}
                                            style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}
                                        >
                                            <Box component="span"
                                                sx={{
                                                    padding: '5px',
                                                    backgroundColor: '#389497',

                                                }}
                                            >
                                                {
                                                    groupedOptions[position].filter(
                                                        (el) =>
                                                            el.checked === true
                                                    ).length

                                                }

                                                {groupedOptions[position].length}
                                            </Box>

                                        </Grid>
                                        <Grid
                                            container
                                            item
                                            xs={2}
                                            style={{ position: 'relative' }}
                                        >

                                            <Checkbox
                                                icon={<RadioButtonUncheckedIcon />}
                                                checkedIcon={<RadioButtonCheckedIcon />}
                                                color="primary"
                                                checked={_.get(
                                                    groupedOpen,
                                                    position,
                                                )}
                                                // onChange={(event) =>
                                                //     setCardCheck(event.target.checked)
                                                // }
                                                
                                                onClick={() =>
                                                    handleToggleOpenGroup(
                                                        position,
                                                    )
                                                }
                                                style={{ position: 'absolute', right: '1px' }}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Collapse
                                        in={_.get(
                                            groupedOpen,
                                            position,
                                        )}
                                        key={index}
                                        onEnter={expand}
                                    >
                                        <Grid container spacing={2} className={classes.grid_items_padding_left}>
                                            {/* <FormGroup> */}
                                            {objValues.map(
                                                (value, i) => (
                                                    <Grid item sm={6}  lg={4} xs={12} md={4} >
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
                                    </Collapse>
                                </Fragment>
                            </Paper>

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
