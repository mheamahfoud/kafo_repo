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
import { GetSubJobs, UpdateJobs } from '../../../../api/administration/systemKey';
import { getJobs, } from '../../../../api/list';

import AddIcon from '@material-ui/icons/Add';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { useSnackbar } from 'notistack';
import AddSubJobs from '../../../../components/Dialog/AddSubJobs';
import { getPositions } from '../../../../api/list';
import { Autocomplete } from '@material-ui/lab';
import { connect } from 'react-redux';
import { UpdatetSubJobs } from '../../../../api/administration/systemKey';
import CustomTableToolbarAnotherStyle from '../../../../components/table/CustomTableToolbarAnotherStyle';
import CircleCheckbox from '../../../../components/table/CircleCheckbox';

function SubJobs({ jobs }) {
    const [tableList, setTableList] = useState([]);
    const [addDialogOpen, setAddDialogOpen] = useState(false);

    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const [tableEditIndex, setTableEditIndex] = useState(null);
    const [job_id, setJobId] = useState(null);

    const { enqueueSnackbar } = useSnackbar();

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
        getJobs();
        GetSubJobs().then((result) => {
            setTableList(result.data);
            setIsLoading(false)
        });
    }, []);

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
            label: 'Job',
            name: 'job_id',
            options: {
                filter: true,
                sort: true,
                setCellProps: (value) => ({
                    style: { minWidth: '170px' },
                }),
                customBodyRender: (value, tableMeta, updateValue) =>
                    tableMeta.rowIndex == tableEditIndex ? (
                        <Autocomplete
                            groupBy={(option) => option.type}
                            getOptionLabel={(item) => item.text}
                            disableClearable={true}
                            getOptionSelected={(option, value) => {
                                return value === option.value;
                            }}
                            options={jobs || []}
                            value={
                                jobs[
                                jobs.findIndex(
                                    (item) => item.value === value,
                                )
                                ]
                            }
                            onChange={(event, newValue) => {
                                updateValue(newValue.value);
                            }}
                            renderOption={(item) => (
                                <React.Fragment>{item.text}</React.Fragment>
                            )}
                            renderInput={(params) => (
                                <TextField {...params} size="small" />
                            )}
                        />
                    ) : (
                        jobs.find(
                            (item) => item.value === value,
                        ) != undefined ? jobs.find(
                            (item) => item.value === value,
                        ).text : ''
                    ),
            },
        },

        {
            label: 'Name',
            name: 'name',
            options: {
                filter: false,
                sort: true,
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
        /* {
             label: 'Code',
             name: 'code',
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
         },*/

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
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setTableEditIndex(tableMeta.rowIndex);
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

                                        let request = {};
                                        request['id'] = tableMeta.rowData[0];
                                        request['name'] = tableMeta.rowData[2];
                                        request['job_id'] =
                                            tableMeta.rowData[1];


                                        UpdatetSubJobs(request['id'],
                                            {
                                                name: request['name'],
                                                job_id: request['job_id'],
                                            }

                                        ).then((result) => {
                                            if (!result.error_code) {
                                                setTableEditIndex(null);

                                                setTableList(
                                                    result.data,
                                                );

                                                enqueueSnackbar(
                                                    'Updated successfully!',
                                                    {
                                                        variant: 'success',
                                                        anchorOrigin: {
                                                            vertical: 'bottom',
                                                            horizontal:
                                                                'center',
                                                        },
                                                    },
                                                );
                                            } else {
                                                enqueueSnackbar(result.error, {
                                                    variant: 'error',
                                                    anchorOrigin: {
                                                        vertical: 'bottom',
                                                        horizontal: 'center',
                                                    },
                                                });
                                            }
                                        });
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
        rowHover: false,
        responsive: 'standard',
        ///: '400px',
        pagination: false,
        //  tableBodyMaxHeight: '400px',
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

            <MUIDataTable
                title={'Sub Jobs'}
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

            {addDialogOpen && (
                <AddSubJobs
                    open={addDialogOpen}
                    setList={setTableList}
                    onClose={handleDialogClose}
                />
            )}

        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    jobs: state.mange_list.lists.jobs,
});

export default connect(mapStateToProps)(SubJobs);
