import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import { Box, CircularProgress, TextField } from '@material-ui/core';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import PopoverViewCol from '../PopoverViewCol';
import { TableViewCol, TableFilter } from 'mui-datatables';
import PopoverFilterTable from '../PopoverFilterTable';
import FilterIcon from '@material-ui/icons/FilterList';
import Fab from '@material-ui/core/Fab';
export const defaultToolbarStyles = (theme) => ({
    root: {
        '@media print': {
            display: 'none',
        },
    },
    fullWidthRoot: {},
    left: {
        flex: '1 1 auto',
    },
    fullWidthLeft: {
        flex: '1 1 auto',
    },
    actions: {
        flex: '1 1 auto',
        textAlign: 'right',
    },
    fullWidthActions: {
        flex: '1 1 auto',
        textAlign: 'right',
    },
    titleRoot: {},
    titleText: {},
    fullWidthTitleText: {
        textAlign: 'left',
    },
    icon: {
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
    iconActive: {
        color: theme.palette.primary.main,
    },
    filterPaper: {
        maxWidth: '50%',
    },
    displayData: {
        borderRadius: '8px',
        padding: '10px',
        backgroundColor: '#9bc9cb',
        fontWeight: '600',
        color: '#fff',
        minWidth: '44px',
        textAlign: 'center',
    },
    searchField: {
        width: '150px',
    },
    filterCloseIcon: {
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 100,
    },
    boxContainer: {
        //padding: '0px 20px',
    },
    tableTitle: {
        backgroundColor: '#9bc9cb',
        color: '#fff',
        padding: '13px',
        fontSize: '16px',
        fontWeight: '600',
        minWidth: '22%',
        textAlign: 'center',
    },

    [theme.breakpoints.down('sm')]: {
        titleRoot: {},
        titleText: {
            fontSize: '16px',
        },
        spacer: {
            display: 'none',
        },
        left: {
            // flex: "1 1 40%",
            padding: '8px 0px',
        },
        actions: {
            // flex: "1 1 60%",
            textAlign: 'right',
        },
    },
    [theme.breakpoints.down('xs')]: {
        root: {
            display: 'block',
            '@media print': {
                display: 'none !important',
            },
        },
        left: {
            padding: '8px 0px 0px 0px',
        },
        titleText: {
            textAlign: 'center',
        },
        actions: {
            textAlign: 'center',
        },
    },
    '@media screen and (max-width: 480px)': {},
});

class CustomTableToolbar extends React.Component {
    state = {
        iconActive: null,
        searchText: '',
    };

    handleClick = () => { };

    getActiveIcon = (styles, iconName) => {
        let isActive = this.state.iconActive === iconName;
        if (iconName === 'search') {
            const { showSearch, searchText } = this.state;
            isActive = isActive || showSearch || searchText;
        }
        return isActive ? styles.iconActive : styles.icon;
    };

    isSearchShown = (iconName) => {
        let nextVal = false;
        if (this.state.showSearch) {
            if (this.state.searchText) {
                nextVal = true;
            } else {
                const { onSearchClose } = this.props.options;
                this.props.setTableAction('onSearchClose');
                if (onSearchClose) onSearchClose();
                nextVal = false;
            }
        } else if (iconName === 'search') {
            nextVal = this.showSearch();
        }
        return nextVal;
    };

    setActiveIcon = (iconName) => {
        this.setState(
            (prevState) => ({
                showSearch: this.isSearchShown(iconName),
                iconActive: iconName,
                prevIconActive: prevState.iconActive,
            }),
            () => {
                const { iconActive, prevIconActive } = this.state;

                if (iconActive === 'filter') {
                    this.props.setTableAction('onFilterDialogOpen');
                    if (this.props.options.onFilterDialogOpen) {
                        this.props.options.onFilterDialogOpen();
                    }
                }
                if (iconActive === undefined && prevIconActive === 'filter') {
                    this.props.setTableAction('onFilterDialogClose');
                    if (this.props.options.onFilterDialogClose) {
                        this.props.options.onFilterDialogClose();
                    }
                }
            },
        );
    };

    handleSearch = (event) => {
        this.setState({ searchText: event.target.value });
        this.props.searchTextUpdate(event.target.value);
    };

    render() {
        const {
            data,
            options,
            classes,
            columns,
            filterData,
            filterList,
            filterUpdate,
            resetFilters,
            toggleViewColumn,
            updateColumns,
            title,
            updateFilterByType,
            displayData,
            components = {},
            icons,
            isLoading,
        } = this.props;

        const TableViewColComponent = components.TableViewCol || TableViewCol;
        const TableFilterComponent = components.TableFilter || TableFilter;

        const {
            search,
            downloadCsv,
            print,
            viewColumns,
            filterTable,
        } = options.textLabels.toolbar;

        const closeFilterPopover = () => {
            this.setState({ hideFilterPopover: true });
        };

        return (
            <React.Fragment>
                <Box
                    display="flex"
                    alignItems="center"
                    className={classes.boxContainer}
                >
                    <Box className={classes.tableTitle}>{title}</Box>
                    <Box className={classes.displayData} marginX={1}>
                        {!isLoading && displayData.length}
                        {isLoading && (
                            <CircularProgress
                                size={20}
                                style={{
                                    position: 'relative',
                                    top: 4,
                                }}
                            />
                        )}
                    </Box>
                    <Box flexGrow={1} marginX={1}>
                        <TextField
                            className={classes.searchField}
                            label="Search"
                            variant="outlined"
                            size="small"
                            value={this.state.searchText || ''}
                            onChange={this.handleSearch}
                        />
                    </Box>

                    <Box>


                        <PopoverViewCol
                            refExit={this.setActiveIcon.bind(null)}
                            classes={{ closeIcon: classes.filterCloseIcon }}
                            trigger={
                                <Tooltip
                                    title={viewColumns}
                                    disableFocusListener
                                >
                                    <IconButton
                                        data-testid={
                                            viewColumns + '-iconButton'
                                        }
                                        aria-label={viewColumns}
                                        classes={{
                                            root: this.getActiveIcon(
                                                classes,
                                                'viewcolumns',
                                            ),
                                        }}
                                        onClick={this.setActiveIcon.bind(
                                            null,
                                            'viewcolumns',
                                        )}
                                    >
                                        <ViewColumnIcon />
                                    </IconButton>
                                </Tooltip>
                            }
                            content={
                                <TableViewColComponent
                                    data={data}
                                    columns={columns}
                                    options={options}
                                    onColumnUpdate={toggleViewColumn}
                                    updateColumns={updateColumns}
                                    components={components}
                                />
                            }
                        />
                        {!(
                            options.filter === false ||
                            options.filter === 'false'
                        ) && (
                                <PopoverViewCol
                                    refExit={this.setActiveIcon.bind(null)}
                                    hide={
                                        this.state.hideFilterPopover ||
                                        options.filter === 'disabled'
                                    }
                                    classes={{
                                        paper: classes.filterPaper,
                                        closeIcon: classes.filterCloseIcon,
                                    }}
                                    trigger={
                                        <Tooltip
                                            title={filterTable}
                                            disableFocusListener
                                        >
                                            <IconButton
                                                data-testid={
                                                    filterTable + '-iconButton'
                                                }
                                                aria-label={filterTable}
                                                classes={{
                                                    root: this.getActiveIcon(
                                                        classes,
                                                        'filter',
                                                    ),
                                                }}
                                                disabled={
                                                    options.filter === 'disabled'
                                                }
                                                onClick={this.setActiveIcon.bind(
                                                    null,
                                                    'filter',
                                                )}
                                            >
                                                <FilterIcon />
                                            </IconButton>
                                        </Tooltip>
                                    }
                                    content={
                                        <TableFilterComponent
                                            customFooter={
                                                options.customFilterDialogFooter
                                            }
                                            columns={columns}
                                            options={options}
                                            filterList={filterList}
                                            filterData={filterData}
                                            onFilterUpdate={filterUpdate}
                                            onFilterReset={resetFilters}
                                            handleClose={closeFilterPopover}
                                            updateFilterByType={updateFilterByType}
                                            components={components}
                                        />
                                    }
                                />
                            )}
                        {icons &&
                            icons.map((icon, i) =>
                                icon.hasOwnProperty('permission') ? (
                                    authManger.mapTree([{ subjob: null, job: icon.permission, position: 'projects', team: 'Administration_Group' }])
                                    && (
                                        <Tooltip key={i} title={icon.title}>
                                            <IconButton
                                                className={classes.iconButton}
                                                onClick={icon.onClick}
                                            >
                                                <Fab
                                                    color="primary"
                                                    className={classes.fab}
                                                    style={{
                                                        backgroundColor: '#389497',
                                                        outline: 'none',
                                                        width: '35px',
                                                        height: '35px',
                                                        marginTop: '2px',
                                                    }}
                                                >
                                                      {icon.icon}
                                                    {/* <AddIcon style={{ fontSize: '33px' }} /> */}
                                                </Fab>
                                              
                                            </IconButton>
                                        </Tooltip>
                                    )
                                ) : (
                                    <Tooltip key={i} title={icon.title}>
                                        <IconButton
                                            className={classes.iconButton}
                                            onClick={icon.onClick}
                                        >
                                            {/* {icon.icon} */}
                                        </IconButton>
                                    </Tooltip>
                                ),
                            )}
                    </Box>
                </Box>
            </React.Fragment>
        );
    }
}

export default withStyles(defaultToolbarStyles, { name: 'CustomTableToolbar' })(
    CustomTableToolbar,
);
