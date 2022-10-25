import {
    Box,
    Fab,
    FormControlLabel,
    IconButton,
    TextField,
    Tooltip,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import React from 'react';
import { useState } from 'react';
import { GetJobs, UpdateJobs } from '../../../../api/administration/systemKey';
import AddIcon from '@material-ui/icons/Add';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { useSnackbar } from 'notistack';
import AddJobs from '../../../../components/Dialog/AddJobs';
import EditJob from '../../../../components/Dialog/EditJob';

import { getJobs, getPositions } from '../../../../api/list';
import { Autocomplete } from '@material-ui/lab';
import { connect } from 'react-redux';
import CustomTableToolbarAnotherStyle from '../../../../components/table/CustomTableToolbarAnotherStyle';
import CircleCheckbox from '../../../../components/table/CircleCheckbox';
import './sys.css'
import { useAxios } from 'use-axios-client';
import CircularProgress from '@mui/material/CircularProgress';

function Jobs({ positions }) {
    const [tableList, setTableList] = useState([]);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [tableEditIndex, setTableEditIndex] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const [job_id, setJobId] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const handleClickOpen = () => {
        setAddDialogOpen(true)
    }
    const typeList = [
        {
            value: 'administrative',
            text: 'administrative',
        },
        { value: 'production', text: 'production' },
        { value: 'service', text: 'service' },
    ];
    React.useEffect(() => {
        //  getPositions();
       
          GetJobs().then((result) => {
            setIsLoading(false)
             setTableList(result.data);
           
         });
        
    }, []);
    //  const data1 = GetJobs().data;

    // const { data, error, loading } = useAxios({
    //     method: 'post',
    //     url: 'http://localhost:8000/api/index_Jobs1'
    // }
    // );

    const tableColumns = [
        {
            label: 'ID',
            name: 'id',
            options: {
                filter: false,
                setCellProps: (value) => ({
                    style: { width: '3%' },
                }),
            }

        },
        {
            label: 'Type',
            name: 'type',
            options: {
                sort: true,
                filter: true,
                setCellProps: (value) => ({
                    style: { minWidth: '170px', width: '15%' },
                }),
                customBodyRender: (value, tableMeta, updateValue) =>
                    tableMeta.rowIndex == tableEditIndex ? (
                        <Autocomplete
                            getOptionLabel={(item) => item.text}
                            disableClearable={true}
                            getOptionSelected={(option, value) => {
                                return value.value === option.value;
                            }}
                            options={typeList}
                            value={
                                typeList[
                                typeList.findIndex(
                                    (item) => item.text === value,
                                )
                                ]
                            }
                            onChange={(event, newValue) => {
                                updateValue(newValue.text);
                            }}
                            renderOption={(item) => (
                                <React.Fragment>{item.text}</React.Fragment>
                            )}
                            renderInput={(params) => (
                                <TextField {...params} size="small" />
                            )}
                        />
                    ) : (
                        value
                    ),
            },
        },
        {
            label: 'Psitions',
            name: 'positions',
            options: {
                filter: true,
                sort: true,
                setCellProps: (value) => ({
                    style: { minWidth: '170px' },
                }),
                customBodyRender: (value, tableMeta, updateValue) =>

                (
                    tableMeta.rowData[2] != undefined ? tableMeta.rowData[2].map(x => x.name).join(',') : ''
                )
            },
        },
        {
            label: 'Name',
            name: 'name',
            options: {
                sort: true,
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) =>
                    tableMeta.rowIndex == tableEditIndex ? (
                        <FormControlLabel
                            style={{
                                marginLeft: '0px',
                                marginRight: '0px',
                            }}
                            control={<TextField value={value || ''} />}
                            onChange={(event) =>
                                updateValue(event.target.value)
                            }
                        />
                    ) : (
                        value
                    ),
            },
        },
        /*{
            label: 'Code',
            name: 'code',
            options: {
                filter: true,
                customBodyRender: (value, tableMeta, updateValue) =>
                    tableMeta.rowIndex == tableEditIndex ? (
                        <FormControlLabel
                            style={{
                                marginLeft: '0px',
                                marginRight: '0px',
                            }}
                            control={<TextField value={value || ''} />}
                            onChange={(event) =>
                                updateValue(event.target.value)
                            }
                        />
                    ) : (
                        value
                    ),
            },
        },*/
        // {
        //     label: 'Position',
        //     name: 'position_id',
        //     options: {
        //         filter: false,
        //         setCellProps: (value) => ({
        //             style: { minWidth: '170px' },
        //         }),
        //         customBodyRender: (value, tableMeta, updateValue) =>
        //             tableMeta.rowIndex == tableEditIndex ? (
        //                 <Autocomplete
        //                     getOptionLabel={(item) => item.text}
        //                     disableClearable={true}
        //                     getOptionSelected={(option, value) => {
        //                         return value === option;
        //                     }}
        //                     options={positions.map((option) => option)}
        //                     value={
        //                         positions &&
        //                         positions[
        //                         positions.findIndex(
        //                             (item) => item.value === value,
        //                         )
        //                         ]
        //                     }
        //                     onChange={(event, newValue) => {
        //                         updateValue(newValue.value);
        //                     }}
        //                     renderOption={(item) => (
        //                         <React.Fragment>{item.text}</React.Fragment>
        //                     )}
        //                     renderInput={(params) => (
        //                         <TextField {...params} size="small" />
        //                     )}
        //                 />
        //             ) : positions ? (
        //                 positions[
        //                     positions.findIndex((item) => item.value === value)
        //                 ] != undefined ? positions[
        //                     positions.findIndex((item) => item.value === value)
        //                 ].text : ''
        //             ) : (
        //                 ''
        //             ),
        //     },
        // },

        {
            label: 'Multi Episode',
            name: 'multi_episode',
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) =>
                    tableMeta.rowIndex == tableEditIndex ? (
                        <FormControlLabel
                            style={{
                                marginLeft: '0px',
                                marginRight: '0px',
                            }}
                            control={<TextField value={value || ''} />}
                            onChange={(event) =>
                                updateValue(event.target.value)
                            }
                        />
                    ) : (
                        value
                    ),
            },
        },
        {
            name: '',
            options: {
                filter: false,
                sort: false,
                empty: true,
                setCellProps: (value) => {
                    return {
                        style: {
                            width: '1px',
                        },
                    };
                },
                customBodyRender: (value, tableMeta, updateValue) =>
                    tableMeta.rowIndex != tableEditIndex ? (
                        <Box display="flex">
                            <Tooltip title={'Edit table'}>
                                <IconButton
                                    color="primary"
                                    size="small"
                                   // disabled={tableMeta.rowData[1] == 'permission'}
                                    onClick={(e) => {
                                        //  setAddDialogOpen(true)
                                        // e.preventDefault();
                                        // e.stopPropagation();
                                        // setTableEditIndex(tableMeta.rowIndex);
                                        setJobId(tableMeta.rowData[0]);
                                        setEditDialogOpen(true)
                                    }}
                                >
                                    <EditRoundedIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    ) : (
                        <Box display="flex">
                            <Tooltip title={'Save'}>
                                <IconButton
                                    color="primary"
                                    size="small"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        // let request = {};
                                        // request['id'] = tableMeta.rowData[0];
                                        // request['name'] = tableMeta.rowData[1];
                                        // request['position_id'] =
                                        //     tableMeta.rowData[2];
                                        // request['type'] = tableMeta.rowData[3];
                                        // request['multi_episode'] =
                                        //     tableMeta.rowData[4];

                                        // UpdateJobs(request.id, request).then(
                                        //     (result) => {
                                        //         if (
                                        //             !result.error_code
                                        //         ) {
                                        //             setTableEditIndex(null);

                                        //             setTableList(result.data);

                                        //             enqueueSnackbar(
                                        //                 'Updated successfully!',
                                        //                 {
                                        //                     variant: 'success',
                                        //                     anchorOrigin: {
                                        //                         vertical:
                                        //                             'bottom',
                                        //                         horizontal:
                                        //                             'center',
                                        //                     },
                                        //                 },
                                        //             );
                                        //         } else {
                                        //             enqueueSnackbar(
                                        //                 result.error,
                                        //                 {
                                        //                     variant: 'error',
                                        //                     anchorOrigin: {
                                        //                         vertical:
                                        //                             'bottom',
                                        //                         horizontal:
                                        //                             'center',
                                        //                     },
                                        //                 },
                                        //             );
                                        //         }
                                        //     },
                                        // );
                                    }}
                                >
                                    <SaveRoundedIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    ),
            },
        },
    ];

    const handleDialogClose = () => {
        setAddDialogOpen(false);
    };
    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    const options = {
        filter: true,
        download: false,
        print: false,
        selectableRows: 'none',
        enableNestedDataAccess: '.',
        filterType: 'dropdown',
        rowHover: true,
        responsive: 'standard',
        //  tableBodyHeight: '400px',
        pagination: true,
        // tableBodyMaxHeight: '400px',
    };

    return (
        <React.Fragment>
            {/* <Box p={1} textAlign="end">
                <Fab
                    size="medium"
                    color="primary"
                    aria-label="add"
                    onClick={() => setAddDialogOpen(true)}
                >
                    <AddIcon />
                </Fab>
            </Box> */}
            {/* {loading && <Box sx={{ display: 'flex', justifyContent:'center', paddingTop:'100px' }}>
                <CircularProgress />
            </Box>}
            {error && <div>{error.message}</div>} */}
            {

             
                <MUIDataTable
                    title={'Jobs'}
                    data={tableList}
                    columns={tableColumns}
                    options={options}
                    components={{
                        Checkbox: CircleCheckbox,
                        TableToolbar: (props) => (
                            <CustomTableToolbarAnotherStyle
                                {...props}
                                isLoading={isLoading}
                                icons={[
                                    // {
                                    //     title: 'Change Size',
                                    //     onClick: toggleGridSize,
                                    //     icon: <SettingsOverscanIcon />,
                                    // },
                                    {
                                        title: 'add',
                                        onClick: handleClickOpen,
                                        path: '/ProjectAdd',
                                        permission: 'production_project_add',
                                        icon: <AddIcon />,
                                    },
                                ]}
                            />
                        ),
                    }}
                />
            }


            <AddJobs
                open={addDialogOpen}
                setList={setTableList}
                onClose={handleDialogClose}
                isEdit={false}
                job_id={null}
            />

            {editDialogOpen && (
                <EditJob
                    open={editDialogOpen}
                    setList={setTableList}
                    onClose={handleEditDialogClose}
                    isEdit={true}
                    job_id={job_id}
                />
            )}
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    positions: state.mange_list.lists.positions,
});

export default connect(mapStateToProps)(Jobs);
