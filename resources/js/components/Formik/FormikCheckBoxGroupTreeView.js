import * as React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@mui/material/SvgIcon';
import { alpha, styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
// import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// web.cjs is required for IE11 support
import { useSpring, animated } from 'react-spring'
import Checkbox from '@material-ui/core/Checkbox';
import './FormikCheckBoxGruopTreeViewStyling.css';
import { Fragment, useEffect, useState, useRef } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import { alertTitleClasses } from '@mui/material';
import IosSwitch from '../IosSwitch';
//import { v4 as uuidv4 } from 'uuid';
import { Autocomplete } from '@material-ui/lab';
import { Alert } from 'bootstrap';

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
function MinusSquare(props) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
        </SvgIcon>
    );
}

function PlusSquare(props) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
        </SvgIcon>
    );
}

function CloseSquare(props) {
    return (
        <div style={{ display: 'none' }}></div>
        // <SvgIcon
        //   className="close"
        //   fontSize="inherit"
        //   style={{ width: 14, height: 14 }}
        //   {...props}
        // >
        //   {/* tslint:disable-next-line: max-line-length */}
        //   <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
        // </SvgIcon>
    );
}

function TransitionComponent(props) {
    const style = useSpring({
        from: {
            opacity: 0,
            transform: 'translate3d(20px,0,0)',
        },
        to: {
            opacity: props.in ? 1 : 0,
            transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
        },
    });

    return (
        <animated.div style={style}>
            <Collapse {...props} />
        </animated.div>
    );
}

TransitionComponent.propTypes = {
    /**
     * Show the component; triggers the enter or exit states
     */
    in: PropTypes.bool,
};

const StyledTreeItem = styled((props) => (
    <TreeItem   {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
        '& .close': {
            opacity: 0.3,
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 15,
        paddingLeft: 18,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
}));


export default function FormikCheckBoxGroupTreeView({
    isRequired,
    setFieldValue,
    name,
    options,
    setSubjob1,
    setJobs1,
    setPositions1,
    setTeams1,
    title,
    collapse,
    isRole,
    allPermissions_init,
    ...props
}) {
    const classes = useStyles();
    const { t } = useTranslation();
    const [groupedOptions, setGroupedOptions] = useState({});
    const [groupedOpen, setGroupedOpen] = useState({});
    const [groupedTreeOpen, setGroupedTreeOpen] = useState({});
    const [groupedTypes, setGroupedTypes] = useState({});

    const { values } = useFormikContext();
    const [subjobs, setSubjobs] = useState([]);
    const [allCheck, setAllCheck] = useState(false);

    const countCheck = useRef(0);
    const types = [
        { value: '1', text: 'C++' },
        { value: '2', text: 'JAVA' },
        { value: '3', text: 'Javascript' },
    ];
   // Array(1000).fill().map((v,i)=>i)
    const [expanded, setExpanded] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
  
    const handleToggle = (event, nodeIds) => {
     //   console.log(nodeIds)
      //  alert(JSON.stringify(nodeIds))
      setExpanded(nodeIds);
    };
  
    const handleSelect = (event, nodeIds) => {
       // console.log(nodeIds)
      //  alert(JSON.stringify(nodeIds))
      setSelected(nodeIds);
    };
  
    const handleExpandClick = () => {
      setExpanded((oldExpanded) =>
        oldExpanded.length === 0 ? ["1", "5", "6", "7"] : []
      );
    };
  
    const handleSelectClick = () => {
      setSelected((oldSelected) =>
        oldSelected.length === 0
          ? ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
          : []
      );
    };
    // const [nodeId, setNodeId] = useState(false);
    var nodeId = 0;
    var nodobj={};
    React.useEffect(() => {
        if (options.length == 0) return;
        let obj = {};
        let obj1 = {};
        Object.keys(
            _.groupBy(options, function (option) {
                return option.name;
            }),
        ).map((position) => {
            obj[position] = collapse;
        });



        setGroupedOpen(obj);
    }, [options]);

    // React.useEffect(() => {
    //     if (options.length == 0) return;
    //     let obj = {};
    //     let obj1 = {};
    //     Object.keys(
    //         _.groupBy(options, function (option) {
    //             return option.name;
    //         }),
    //     ).map((position) => {
    //         obj[position] = false;
    //     });



    //     setGroupedOpen(obj);
    // }, [allPermissions_init]);
    
    React.useEffect(() => {
      
        if (allPermissions_init!= undefined ){
           // setExpanded(Array(1000).fill().map((v,i)=>i))
        //   var x=   _.groupBy(allPermissions_init, function (option) {
        //         return option.teams_id;
        //     });
        //  console.log(x)
        //  Object.entries(x).map(
        //     function ([team, objValues], index) {
        //       //  console.log(team)
        //        // setExpanded(Array(nodobj[team]).fill().map((v,i)=>i))
        //     });
            setFieldValue(name, [...allPermissions_init]);
        } 
       
        

    }, [allPermissions_init]);
    React.useEffect(() => {
        if (options.length == 0) return;
       
        let obj = {}
        Object.keys(
            _.groupBy(options, function (option) {
                return option.name;
            }),
        ).map((position) => {
            obj[position] = 3;
        });
        setGroupedTypes(obj);

    }, [options]);

    React.useEffect(() => {
        if (options.length == 0) return;
        var tmp={};
        setGroupedOptions(
            _.groupBy(
                options,

                
                function (option) {

                    return option.name;
                },
            ),
        );
     
    }, [options]);
    //checked:
    //change type
    const delay = ms => new Promise(res => setTimeout(res, ms));

    
    const handleChangeType = (event, position) => {

        if (values[name]) {
            let pos_job = [];
            let arrWithPos = values[name];
            for (var i = 0; i < arrWithPos.length; i++) {
                if (arrWithPos[i].teams_id == groupedOptions[position][0].id)
                    arrWithPos[i].type = event.target.value;
            }
            setFieldValue(name, [...arrWithPos]);
        }
        setGroupedTypes({ ...groupedTypes, [position]: event.target.value });
    }
    const handleChange = (event, sub_job, job_id, position_id, teams_id, type) => {
        if (event.target.checked) {
            if (values[name]) {
                //  setFieldValue(name, '');
                setFieldValue(name, [...values[name], { sub_job_id: event.target.value, job_id: job_id, position_id: position_id, teams_id: teams_id, type: type }]);
            } else {
                setFieldValue(name, [{ sub_job_id: event.target.value, job_id: job_id, position_id: position_id, teams_id: teams_id, type: type }]);
            }
        } else {
            const removeIndex = values[name] && values[name].findIndex(v => v.sub_job_id == sub_job && v.job_id == job_id && v.position_id == position_id && v.teams_id == teams_id);
            if (removeIndex != -1)
                setFieldValue(name, values[name] && values[name].filter(function (ele, i) {
                    return i != removeIndex;
                }));

        }


    };




    const handleChangeposition = (event, job, position_id, teams_id, type) => {
       
      
        if (event.target.checked) {
            if (values[name]) {
                let pos_job = [];
                let arrWithPos = [];
                arrWithPos = values[name];
                if (job.length > 0) {
                    
                    for (var i = 0; i < job.length; i++) {
                        if (job[i].sub_job.length > 0) {
                            for (var j = 0; j < job[i].sub_job.length; j++) {

                                if (job[i].sub_job[j] != undefined) {
                                    const removeIndex = values[name] && values[name].findIndex(v => v.sub_job_id == job[i].sub_job[j].id && v.job_id == job[i].id && v.position_id == position_id && v.teams_id == teams_id);
                                    if (removeIndex == -1) {
                                        pos_job.push({ sub_job_id: job[i].sub_job[j].id, job_id: job[i].id, position_id: position_id, teams_id: teams_id, type: type })
                                            //  setFieldValue(name, [...values[name], { sub_job_id: sub_jobs_list[i].id, job_id: job_id, position_id: position_id, teams_id: teams_id, type: 1 }]);
                                            // delay(500)
                                            ;
                                    }
                                }

                            }
                        }
                        else {
                            if (job[i] != undefined) {
                                const removeIndex = values[name] && values[name].findIndex(v => v.sub_job_id == null && v.job_id == job[i].id && v.position_id == position_id && v.teams_id == teams_id);
                                if (removeIndex == -1) {
                                    pos_job.push({ sub_job_id: null, job_id: job[i].id, position_id: position_id, teams_id: teams_id, type: type });
                                }
                            }
                        }

                    }
                }
                else {
                    const removeIndex = values[name] && values[name].findIndex(v => v.sub_job_id == null && v.job_id == null && v.position_id == position_id && v.teams_id == teams_id);
                    if (removeIndex == -1) {
                        pos_job.push({ sub_job_id: null, job_id: null, position_id: position_id, teams_id: teams_id, type: type });
                    }
                }


                arrWithPos = new Set([
                    ...(values[name].length !== 0
                        ? values[name]
                        : []),
                    ...pos_job,
                ]);
                setFieldValue(name, [...arrWithPos]);


            }
            else {
                let pos_job = [];
                let arrWithPos = [];
                if (job.length > 0) {
                    for (var i = 0; i < job.length; i++) {
                        if (job[i].sub_job.length > 0) {
                            for (var j = 0; j < job[i].sub_job.length; j++) {
                                if (job[i].sub_job[j] != undefined) {
                                    pos_job.push({ sub_job_id: job[i].sub_job[j].id, job_id: job[i].id, position_id: position_id, teams_id: teams_id, type: type })
                                }

                            }
                        }
                        else {
                            if (job[i] != undefined) {
                                pos_job.push({ sub_job_id: null, job_id: job[i].id, position_id: position_id, teams_id: teams_id, type: type })
                            }
                        }

                    }
                }
                else {
                    //if (job[i] != undefined) {
                    pos_job.push({ sub_job_id: null, job_id: null, position_id: position_id, teams_id: teams_id, type: type })
                    //}
                }

                arrWithPos = new Set([
                    ...([]),
                    ...pos_job,
                ]);
                // console.log(pos_job)
                setFieldValue(name, [...pos_job]);

            }


        } else {
            let pos_job = [];
            let arrWithPos = [];
            if (job.length > 0) {
               
                for (var i = 0; i < job.length; i++) {
                    if (job[i].sub_job.length > 0) {
                        for (var j = 0; j < job[i].sub_job.length; j++) {
                            const removeIndex = values[name] && values[name].findIndex(v => v.sub_job_id == job[i].sub_job[j].id && v.job_id == job[i].id && v.position_id == position_id && v.teams_id == teams_id);
                            if (removeIndex != -1)
                                pos_job.push(values[name][removeIndex])
                        }
                    }
                    else {
                        const removeIndex = values[name] && values[name].findIndex(v => v.sub_job_id == null && v.job_id == job[i].id && v.position_id == position_id && v.teams_id == teams_id);
                        if (removeIndex != -1)
                            pos_job.push(values[name][removeIndex])
                    }

                }
            }
            else {
                const removeIndex = values[name] && values[name].findIndex(v => v.sub_job_id == null && v.job_id == null && v.position_id == position_id && v.teams_id == teams_id);
                if (removeIndex != -1)
                    pos_job.push(values[name][removeIndex])
            }
            
            arrWithPos = values[name].filter((v) => !pos_job.includes(v));
            setFieldValue(name, [...arrWithPos]);
        }
    }


    const handleChangeJob = (event, job_id, position_id, teams_id, sub_jobs_list, type) => {

        if (event.target.checked) {
            if (values[name]) {
                let pos_job = [];
                let arrWithPos = [];
                arrWithPos = values[name];
                if (sub_jobs_list.length > 0) {
                    for (var i = 0; i < sub_jobs_list.length; i++) {
                        const removeIndex = values[name] && values[name].findIndex(v => v.sub_job_id == sub_jobs_list[i].id && v.job_id == job_id && v.position_id == position_id && v.teams_id == teams_id);
                        if (removeIndex == -1) {
                            pos_job.push({ sub_job_id: sub_jobs_list[i].id, job_id: job_id, position_id: position_id, teams_id: teams_id, type: type })
                                //  setFieldValue(name, [...values[name], { sub_job_id: sub_jobs_list[i].id, job_id: job_id, position_id: position_id, teams_id: teams_id, type: 1 }]);
                                // delay(500)
                                ;
                        }
                    }
                }
                else {
                    const removeIndex = values[name] && values[name].findIndex(v => v.sub_job_id == null && v.job_id == job_id && v.position_id == position_id && v.teams_id == teams_id);
                    if (removeIndex == -1) {
                        pos_job.push({ sub_job_id: null, job_id: job_id, position_id: position_id, teams_id: teams_id, type: type })
                            //  setFieldValue(name, [...values[name], { sub_job_id: sub_jobs_list[i].id, job_id: job_id, position_id: position_id, teams_id: teams_id, type: 1 }]);
                            // delay(500)
                            ;
                    }
                }

                arrWithPos = new Set([
                    ...(values[name].length !== 0
                        ? values[name]
                        : []),
                    ...pos_job,
                ]);
                setFieldValue(name, [...arrWithPos]);


            }
            else {
                let pos_job = [];
                let arrWithPos = [];
                if (sub_jobs_list.length > 0) {
                    for (var i = 0; i < sub_jobs_list.length; i++) {

                        pos_job.push({ sub_job_id: sub_jobs_list[i].id, job_id: job_id, position_id: position_id, teams_id: teams_id, type: type })

                    }
                }
                else {
                    pos_job.push({ sub_job_id: null, job_id: job_id, position_id: position_id, teams_id: teams_id, type: type })

                }

                arrWithPos = new Set([
                    ...([]),
                    ...pos_job,
                ]);
                setFieldValue(name, [...pos_job]);

            }


        } else {
            let pos_job = [];
            let arrWithPos = [];
            if (sub_jobs_list.length > 0) {
                var flag = false
                for (let i = 0; i < sub_jobs_list.length; i++) {
                    const removeIndex = values[name] && values[name].findIndex(v => v.sub_job_id == sub_jobs_list[i].id && v.job_id == job_id && v.position_id == position_id && v.teams_id == teams_id);
                    if (removeIndex != -1)
                        pos_job.push(values[name][removeIndex])
                    else
                        flag = true
                }
                if (flag) {
                    const removeIndex = values[name] && values[name].findIndex(v => v.sub_job_id == null && v.job_id == job_id && v.position_id == position_id && v.teams_id == teams_id);
                    if (removeIndex != -1)
                        pos_job.push(values[name][removeIndex])
                }
            }
            else {
                const removeIndex = values[name] && values[name].findIndex(v => v.sub_job_id == null && v.job_id == job_id && v.position_id == position_id && v.teams_id == teams_id);
                var x=values[name].filter(v => v.sub_job_id == null && v.job_id == job_id && v.position_id == position_id && v.teams_id == teams_id).length;
               
                if (removeIndex != -1)
                    pos_job.push(values[name][removeIndex])
            }

            arrWithPos = values[name].filter((v) => !pos_job.includes(v));
            setFieldValue(name, [...arrWithPos]);
        }
    }
    const handleCheckAll = () => {
        // if (values[name] && values[name].split(',').length == options.length) {
        //     setFieldValue(name, '');
        // } else {
        //     setFieldValue(name, options.map((option) => option.value).join());
        // }
    };
    const checkIfValueExisited = (vendors, value) => {
        var found = false;
        for (var i = 0; i < vendors.length; i++) {
            if (vendors[i].id == value) {
                found = true;
                break;
            }
        }
        return found;
    }
    let checker = (arr, target) => target.every((v) => arr.includes(v));

    const handleCheckAllPosition = (position) => {
        //console.log(subjobs);
        //if (!values[name]) return;
        let pos_job = options
            .filter((el) => el.position_name === position)
            .map((el) => el.value);
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
       // setExpanded([])
        console.log(nodobj)
        setGroupedOpen({ ...groupedOpen, [position]: !groupedOpen[position] });
    };
    const expand = () => {
        // alert('5')
    }
    const checkAllsubPositions = (values, jobs, position_id, teams_id, isJob) => {
        var counter = 0;
        if (values && values.length > 0) {
            if (isJob) {
                for (var i = 0; i < jobs.length; i++) {
                    if (jobs[i].sub_job.length > 0) {
                        // for (var j = 0; j < jobs[i].sub_job.length; i++) {
                        const length = values.filter(v => v.job_id == jobs[i].id && v.position_id == position_id && v.teams_id == teams_id).length;
                        if (length == jobs[i].sub_job.length) {
                            counter++;
                            //  break;
                        }
                        // }
                    }
                    else {
                        const removeIndex = values.findIndex(v => v.sub_job_id == null && v.job_id == jobs[i].id && v.position_id == position_id && v.teams_id == teams_id);
                        if (removeIndex != -1) {
                            counter++;
                        }
                    }

                }
                if (counter == jobs.length)
                    return true
                else
                    return false;
            }
            else {

                for (var i = 0; i < jobs.length; i++) {
                    const removeIndex = values.findIndex(v => v.sub_job_id == null && v.job_id == null && v.position_id == position_id && v.teams_id == teams_id);
                    if (removeIndex != -1) {
                        counter++;
                    }
                }
                if (counter == jobs.length)
                    return true
                else
                    return false;
                // if (counter == items.length)
            }

        }
        else {
            return false;
        }
    }

    const checkAllsubJobs = (values, items, isSub) => {

        var counter = 0;
        if (values && values.length > 0) {
            if (isSub) {
                for (var i = 0; i < items.length; i++) {
                    const removeIndex = values.findIndex(v => v.sub_job_id == items[i].sub_job_id && v.job_id == items[i].job_id && v.position_id == items[i].position_id && v.teams_id == items[i].teams_id);
                    if (removeIndex != -1) {
                        counter++;
                    }

                }
                if (counter == items.length)
                    return true
                else
                    return false;
            }
            else {

                for (var i = 0; i < items.length; i++) {
                    const removeIndex = values.findIndex(v => v.sub_job_id == null && v.job_id == items[i].job_id && v.position_id == items[i].position_id && v.teams_id == items[i].teams_id);
                    if (removeIndex != -1) {
                        counter++;
                    }
                }
                if (counter == items.length)
                    return true
                else
                    return false;
                // if (counter == items.length)

            }

        }
        else {
            return false;
        }


    }
    const checkAllJobs = (values, items, position_id, teams_id) => {
        var flag = true;
        for (var i = 0; i < items.length; i++) {
            for (var j = 0; j < items[i].sub_job.length; j++) {
                const removeIndex = values.findIndex(v => v.sub_job_id == items[i].sub_job[j].id && v.job_id == items[i].id && v.position_id == position_id && v.teams_id == teams_id);
                if (removeIndex == -1) {
                    flag = false
                }
            }
        }
        return flag;

    }
    const checkJobsIfContainSub = (position) => {

        for (var i = 0; i < position.job.length; i++) {
            if (position.job[i].sub_job.length > 0)
                return true;

        }
        return false;

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
                        {/* <Checkbox
                            checked={
                                values[name] &&
                                values[name].split(',').length == options.length
                            }
                            onChange={handleCheckAll}
                        /> */}
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
                       function ([position, objValues], index) {
                            if(objValues.map((x) => (x.positions.length)) > 0 ){
                                var counter =0;
                                nodobj[groupedOptions[position][0].id]=nodeId;
                              //  setGroupedTreeOpen({ ...groupedTreeOpen, [position]:nodeId  });
                               return (<Paper elevation={5} className={classes.paper}>
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
                                                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120, display: isRole ? 'none' : '' }} >
                                                            <Select
                                                                id={groupedOptions[position][0].id}
                                                                defaultValue={3}
                                                                label="Type"
                                                                onChange={(e) => handleChangeType(e, position)}
                                                            >
                                                                <MenuItem value={1} >Manager</MenuItem>
                                                                <MenuItem value={2}>SuperVisor</MenuItem>
                                                                <MenuItem value={3}>Employee</MenuItem>
                                                            </Select>
                                                        </FormControl>


                                                    </Box>
                                                </Box>
                                            </Grid>

                                            <Grid
                                                container
                                                item
                                                xs={5}
                                                style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}
                                            >


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
                                                  



                                                        value.positions.length > 0 ? value.positions.map(
                                                            function (value1, ii) {
                                                                counter=counter+1;
                                                               // alert(counter)
                                                                nodeId = nodeId + 1;
                                                                return (<Grid item sm={12} >
                                                                    <TreeView
                                                                        aria-label="customized"
                                                                        expandIcons={true}
                                                                        defaultCollapseIcon={<MinusSquare />}
                                                                        defaultExpandIcon={<PlusSquare />}
                                                                        defaultEndIcon={null}
                                                                        expanded={expanded}
                                                                        selected={selected}
                                                                        onNodeToggle={handleToggle}
                                                                        onNodeSelect={handleSelect}
                                                                        sx={{ flexGrow: 1 }}
                                                                    >

                                                                        <StyledTreeItem nodeId={nodeId}  label={
                                                                            <FormControlLabel
                                                                                control={
                                                                                    <Checkbox
                                                                                    />
                                                                                }
                                                                                checked={
                                                                                    checkAllsubPositions(values[name],
                                                                                        value1.job.length > 0 ?

                                                                                            value1.job : [{ sub_job_id: null, job_id: null, position_id: value1.id, teams_id: value.id, type: groupedTypes[position] }],
                                                                                        value1.id, value.id,
                                                                                        value1.job.length > 0
                                                                                    )


                                                                                }
                                                                                label={
                                                                                    value1.name
                                                                                }
                                                                                onChange={(e) =>

                                                                                    handleChangeposition(e, value1.job, value1.id, value.id, groupedTypes[position])
                                                                                }
                                                                                value={
                                                                                    value1.id
                                                                                }

                                                                            />

                                                                        }
                                                                        >
                                                                            <Grid container spacing={2} className={classes.grid_items_padding_left}>
                                                                                {value1.job.length > 0 ? value1.job.map(
                                                                                    function (value11, iii) {
                                                                                        counter=counter+1;
                                                                                        nodeId = nodeId + 1;
                                                                                        return (<Grid item sm={6} >
                                                                                            <StyledTreeItem defaultExpanded={true} nodeId={nodeId} label={
                                                                                                //  value11.sub_job.length > 0 ?
                                                                                                <FormControlLabel
                                                                                                    control={
                                                                                                        <Checkbox
                                                                                                        />
                                                                                                    }
                                                                                                    checked={
                                                                                                        values[name] &&

                                                                                                        checkAllsubJobs(
                                                                                                            values[name],
                                                                                                            value11.sub_job.length > 0 ?

                                                                                                                value11.sub_job.map(
                                                                                                                    (e) => {
                                                                                                                        return { sub_job_id: e.id, job_id: value11.id, position_id: value1.id, teams_id: value.id, type: groupedTypes[position] }
                                                                                                                    }
                                                                                                                ) : [{ sub_job_id: null, job_id: value11.id, position_id: value1.id, teams_id: value.id, type: groupedTypes[position] }],
                                                                                                            value11.sub_job.length > 0
                                                                                                        )
                                                                                                    }



                                                                                                    label={
                                                                                                        value11.name
                                                                                                    }
                                                                                                    onChange={(e) =>
                                                                                                        handleChangeJob(e, value11.id, value1.id, value.id, value11.sub_job, groupedTypes[position])
                                                                                                    }
                                                                                                    value={
                                                                                                        value11.id
                                                                                                    }

                                                                                                />
                                                                                                //  : value11.name
                                                                                            }
                                                                                            >

                                                                                                {value11.sub_job.length > 0 ? value11.sub_job.map(
                                                                                                    function (value111, iiii) {
                                                                                                        counter=counter+1;
                                                                                                        nodeId =nodeId + 1;
                                                                                                        return (<div className='row'>
                                                                                                            <div className='col-6'>
                                                                                                                <StyledTreeItem nodeId={nodeId} className='style_item_end' label={
                                                                                                                    <FormControlLabel
                                                                                                                        checked={
                                                                                                                            values[name] && values[name].findIndex(v => v.sub_job_id == value111.id && v.job_id == value11.id && v.position_id == value1.id && v.teams_id == value.id) !== -1
                                                                                                                        }
                                                                                                                        control={
                                                                                                                            <Checkbox
                                                                                                                            />
                                                                                                                        }
                                                                                                                        label={

                                                                                                                            value111.name
                                                                                                                        }
                                                                                                                        onChange={(e) =>

                                                                                                                            handleChange(e, value111.id, value11.id, value1.id, value.id, groupedTypes[position])
                                                                                                                        }
                                                                                                                        value={
                                                                                                                            value111.id
                                                                                                                        }

                                                                                                                    />
                                                                                                                } >

                                                                                                                </StyledTreeItem>
                                                                                                            </div>

                                                                                                        </div>)
                                                                                                    }) : ' no sub jobs'}

                                                                                            </StyledTreeItem>
                                                                                        </Grid>)

                                                                                    }) : 'no jops'}</Grid>


                                                                        </StyledTreeItem>
                                                                    </TreeView>
                                                                </Grid>)
                                                            })
                                                            : 'no positions'




                                                    ),
                                                )}
                                                {/* </FormGroup> */}




                                            </Grid>
                                        </Collapse>
                                    </Fragment>
                                </Paper>)}
                                else {
                                    return  '';
                                }
                               }

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