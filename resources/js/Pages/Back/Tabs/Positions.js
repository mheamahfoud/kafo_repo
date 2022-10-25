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
import {
    GetPositions,
    UpdatePositions,
} from '../../../../api/administration/systemKey';
import AddIcon from '@material-ui/icons/Add';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { useSnackbar } from 'notistack';
import { connect } from 'react-redux';
import AddPositions from '../../../../components/Dialog/AddPositions';
import EditPositions from '../../../../components/Dialog/EditPositions';
import { getJobs, } from '../../../../api/list';
import CustomTableToolbarAnotherStyle from '../../../../components/table/CustomTableToolbarAnotherStyle';
import CircleCheckbox from '../../../../components/table/CircleCheckbox';

function Positions() {
    const [tableList, setTableList] = useState([]);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [tableEditIndex, setTableEditIndex] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const [position_id, setPosition_id] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const handleClickOpen =() =>{
        setAddDialogOpen(true)
     }

    React.useEffect(() => {
        GetPositions().then((result) => {
            setTableList(result.data);
            setIsLoading(false)
        });
        getJobs();
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
            label: 'Code',
            name: 'code',
            hide: true,
            options: {
                filter: false,
                display: false,
                setCellProps: (value) => ({
                    style: { width: '3%'},
                }),
            }
        },
        {
            label: 'Name',
            name: 'name',
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
                                  //  disabled={tableMeta.rowData[1]=='Permission_code_jobs'}
                                    onClick={(e) => {
                                       // e.preventDefault();
                                       // e.stopPropagation();
                                        setPosition_id(tableMeta.rowData[0])
                                        setEditDialogOpen(true)
                                       // setTableEditIndex(tableMeta.rowIndex);
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
                                        request['name'] = tableMeta.rowData[1];

                                        UpdatePositions(
                                            request.id,
                                            request,
                                        ).then((result) => {
                                            if (!result.error_code) {
                                                setTableEditIndex(null);

                                                setTableList(result.data);

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
                                                enqueueSnackbar(result.error_description, {
                                                    variant: 'error',
                                                    anchorOrigin: {
                                                        vertical: 'bottom',
                                                        horizontal: 'center',
                                                    },AddSessionsWork
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
        filter: false,
        download: false,
        print: false,
        selectableRows: 'none',
        enableNestedDataAccess: '.',
        filterType: 'dropdown',
        rowHover: false,
        responsive: 'standard',
        //tableBodyHeight: '400px',
        pagination: false,
//tableBodyMaxHeight: '400px',
    };

    return (
         <React.Fragment>
 

            <MUIDataTable
                title={'Positions'}
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
                                    path:'/ProjectAdd',
                                    permission: 'production_project_add',
                                    icon: <AddIcon />,
                                },
                            ]}
                        />
                    ),
                }}
            />

            {addDialogOpen && (
                <AddPositions
                    open={addDialogOpen}
                    setList={setTableList}
                    onClose={handleDialogClose}
                />
            )}
    {editDialogOpen && (
                <EditPositions
                    open={editDialogOpen}
                    setList={setTableList}
                    onClose={handleEditDialogClose}
                    position_id={position_id}
                />
            )}


        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Positions);
