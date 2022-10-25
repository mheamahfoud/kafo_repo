import React, { Fragment, useState, useRef, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import {
    LoadListsName,
    LoadList,
    AddItemList,
    DeleteKeyItem,
} from '../../../../api/administration/systemKey';
import {
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Snackbar,
} from '@material-ui/core';
import CustomTableToolbarAnotherStyleList from '../../../../components/table/CustomTableToolbarAnotherStyleList';
import CircleCheckbox from '../../../../components/table/CircleCheckbox';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default function ListsTab(props) {

    const [selectedList, setSelectedList1] = useState('');

    const [loadedLists, setLoadedLists] = useState([]);
    const tableColumns = ['Index', 'Title'];

    const [selectedRow, setSelectedRow] = useState([]);
    const connectingRef = useRef(false);
    //------------------------------
    const [open, setOpen] = React.useState(false);
    const dialogFieldRef = useRef();
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    //------------------------------
    const [snackBarOpen, setSnackBarOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleAddItem = () => {
        setOpen(false);
        console.log('dialogField', dialogFieldRef.current.value);
        AddItemList(selectedList, dialogFieldRef.current.value).then(
            (result) => {
                if (!result.error_code) {
                    LoadListFunction(selectedList);
                    setSnackBarOpen(true);
                }
            },
        );
    };
    const handleClose = () => {
        setOpen(false);
    };

    const LoadListFunction = ()=>{
        LoadList({ 'name': selectedList })
            .then((result) => {
                if (!result.error_code) {
                    let tmpArr = [];
                    result.data.map((item, i) => {
                        tmpArr.push([i + 1, item]);
                    });
                    setLoadedLists(tmpArr);

                }
                //  connectingRef.current = false;
            })
            .catch(function (error) {
                //  connectingRef.current = false;
            });
    }

    useEffect(() => {
        /*if (connectingRef.current) {
            return;
        }
        connectingRef.current = true;*/
        LoadList({ 'name': selectedList })
            .then((result) => {
                if (!result.error_code) {
                    let tmpArr = [];
                    result.data.map((item, i) => {
                        tmpArr.push([i + 1, item]);
                    });
                    setLoadedLists(tmpArr);

                }
                //  connectingRef.current = false;
            })
            .catch(function (error) {
                //  connectingRef.current = false;
            });
    }, [selectedList]);
    // const handleSelectedListChange = (e) => {
    //     setSelectedList(e.target.value);
    //     LoadListFunction(e.target.value);
    // };

    // const LoadListFunction = (list_name) => {

    //     if (connectingRef.current) {
    //         return;
    //     }
    //     connectingRef.current = true;
    //     LoadList({ 'name': list_name })
    //         .then((result) => {
    //             if (!result.error_code) {
    //                 let tmpArr = [];
    //                 result.data.map((item, i) => {
    //                     tmpArr.push([i + 1, item]);
    //                 });
    //                 setLoadedLists(tmpArr);
    //             }
    //           //  connectingRef.current = false;
    //         })
    //         .catch(function (error) {
    //           //  connectingRef.current = false;
    //         });
    // };

    const handleChangeSelectedRow = (
        currentRowsSelected,
        allRowsSelected,
        rowsSelected,
    ) => {
        let tmpArr = [];
        rowsSelected.map((i) => {
            tmpArr.push(loadedLists[i][1]);
        });
        setSelectedRow(tmpArr);
    };

    const handleDeleteSelectedRow = (lookup, data, dataIndex) => {
        DeleteKeyItem(selectedList, selectedRow)
            .then((result) => {
                if (!result.error_code) {
                    LoadListFunction(selectedList);
                    return true;
                } else return false;
            })
            .catch(function (error) {
                return false;
            });
    };

    const options = {
        filter: true,
        filterType: 'dropdown',
        responsive: 'standard',
        rowHover: false,
        pagination: false,
        //  tableBodyHeight: '400px',
        // tableBodyMaxHeight: '400px',
        onRowSelectionChange: handleChangeSelectedRow,
        onRowsDelete: handleDeleteSelectedRow,
        onTableChange: (action, state) => {
            //console.log(action);
            //console.dir(state);
        },
    };

    const AddDialog = () => {
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add item</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="itemName"
                        label="itemName"
                        type="text"
                        onChange={(e) =>
                            (dialogFieldRef.current.value = e.target.value)
                        }
                        ref={dialogFieldRef}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddItem} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    return (
        <React.Fragment>
            <Box display="flex" p={1} bgcolor="background.paper">
                {/* <Box p={1} flexGrow={1}>
                    <FormControl variant="outlined">
                        <InputLabel>List</InputLabel>
                        <Select
                            value={selectedList}
                            onChange={handleSelectedListChange}
                            size="small"
                            disabled={!connectingRef}
                            style={{ width: '215px', marginBottom: '10px' }}
                            label="List"
                        >
                            {ListsName.map((item, i) => (
                                <MenuItem key={i} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box> */}

                {/* <Box p={1}>
                    <Fab
                        size="medium"
                        color="primary"
                        aria-label="add"
                        disabled={selectedList == '' ? true : false}
                        onClick={handleClickOpen}
                    >
                        <AddIcon />
                    </Fab>
                </Box> */}
            </Box>

            <MUIDataTable
                title={selectedList}
                data={loadedLists}
                columns={tableColumns}
                options={options}
                components={{
                    Checkbox: CircleCheckbox,
                    TableToolbar: (props) => (
                        <CustomTableToolbarAnotherStyleList
                            // setSelectedList={setSelectedList}

                            setSelectedList={setSelectedList1}
                            connectingRef={connectingRef}

                            {...props}
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

            <AddDialog />
            <Snackbar
                open={snackBarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackBarOpen(false)}
            >
                <Alert severity="success">This is a success message!</Alert>
            </Snackbar>
        </React.Fragment>
    );
}
