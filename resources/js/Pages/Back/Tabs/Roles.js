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
    getRoles,
} from '../../../../api/administration/systemKey';
import AddStudio from '../../../../components/Dialog/AddStudio';
import AddIcon from '@material-ui/icons/Add';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { useSnackbar } from 'notistack';
import AddRoles from '../../../../components/Dialog/AddRole';
import { useHistory } from "react-router-dom";
import CustomTableToolbarAnotherStyle from '../../../../components/table/CustomTableToolbarAnotherStyle';
import CircleCheckbox from '../../../../components/table/CircleCheckbox';
export default function Roles() {
    const [roleList, setRoleList] = useState([]);
    const [addDialogOpen, setAddDialogOpen] = useState(false);

    const [tableEditIndex, setTableEditIndex] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    let history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const handleClickOpen =() =>{
        setAddDialogOpen(true)
     }

    React.useEffect(() => {
        getRoles().then((result) => {
            setIsLoading(false)
            setRoleList(result.data);
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
            label: 'Name',
            name: 'name',
            options: {
                setCellProps: (value) => ({
                    style: { minWidth: '200px' },
                }),
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
        // {
        //     label: 'Description',
        //     name: 'description',
        //     options: {
        //         setCellProps: (value) => ({
        //             style: { minWidth: '200px' },
        //         }),
        //         filter: false,
        //         customBodyRender: (value, tableMeta, updateValue) =>
        //             tableMeta.rowIndex == tableEditIndex ? (
        //                 <FormControlLabel
        //                     style={{
        //                         marginLeft: '0px',
        //                         marginRight: '0px',
        //                     }}
        //                     control={<TextField value={value || ''} />}
        //                     onChange={(event) =>
        //                         updateValue(event.target.value)
        //                     }
        //                 />
        //             ) : (
        //                 value
        //             ),
        //     },
        // },
        // {
        //     label: 'Name',
        //     name: 'name',
        //     options: {
        //         setCellProps: (value) => ({
        //             style: { minWidth: '200px' },
        //         }),
        //         filter: false,
        //         customBodyRender: (value, tableMeta, updateValue) =>
        //             tableMeta.rowIndex == tableEditIndex ? (
        //                 <FormControlLabel
        //                     style={{
        //                         marginLeft: '0px',
        //                         marginRight: '0px',
        //                     }}
        //                     control={<TextField value={value || ''} />}
        //                     onChange={(event) =>
        //                         updateValue(event.target.value)
        //                     }
        //                 />
        //             ) : (
        //                 value
        //             ),
        //     },
        // },
        // {
        //     label: 'Color',
        //     name: 'color',
        //     options: {
        //         customBodyRender: (value, tableMeta, updateValue) =>
        //             tableMeta.rowIndex == tableEditIndex ? (
        //                 <FormControlLabel
        //                     style={{
        //                         marginLeft: '0px',
        //                         marginRight: '0px',
        //                     }}
        //                     control={<TextField value={value || ''} />}
        //                     onChange={(event) =>
        //                         updateValue(event.target.value)
        //                     }
        //                 />
        //             ) : (
        //                 <Box display="flex">
        //                     <div
        //                         style={{
        //                             width: '10px',
        //                             height: '30px',
        //                             backgroundColor: '#' + value,
        //                             margin: '-2px',
        //                         }}
        //                     ></div>
        //                     <div
        //                         style={{
        //                             padding: '0px 8px',
        //                             alignSelf: 'center',
        //                         }}
        //                     >
        //                         {value}
        //                     </div>
        //                 </Box>
        //             ),
        //         setCellProps: (value) => ({
        //             style: { padding: '0px 0px' },
        //         }),
        //     },
        // },
        // {
        //     label: 'Branch',
        //     name: 'branch.name',
        // },
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
                                        history.push('/EditPermissionToRole',{ roles_id: tableMeta.rowData[0]})
                                      //  e.stopPropagation();
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
                                        // request['id'] = tableMeta.rowData[0];
                                        // request['name'] = tableMeta.rowData[1];
                                        // request['color'] = tableMeta.rowData[2];

                                        // UpdateStudio(request.id, request).then(
                                        //     (result) => {
                                        //         setTableEditIndex(null);

                                        //         setStudioList(result.data);

                                        //         enqueueSnackbar(
                                        //             'Updated successfully!',
                                        //             {
                                        //                 variant: 'success',
                                        //                 anchorOrigin: {
                                        //                     vertical: 'bottom',
                                        //                     horizontal:
                                        //                         'center',
                                        //                 },
                                        //             },
                                        //         );
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

    const options = {
        filter: false,
        download: false,
        print: false,
        selectableRows: 'none',
        enableNestedDataAccess: '.',
        filterType: 'dropdown',
        rowHover: false,
        responsive: 'standard',
       // tableBodyHeight: '400px',
        pagination: false,
        //tableBodyMaxHeight: '400px',
    };

    return (
        <React.Fragment>
     

            <MUIDataTable
                title={'Role'}
                data={roleList}
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

            <AddRoles
                open={addDialogOpen}
                setRoleList={setRoleList}
                onClose={handleDialogClose}
            />
        </React.Fragment>
    );
}
