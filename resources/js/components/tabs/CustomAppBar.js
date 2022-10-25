import React from 'react';
import { AppBar, Tab, Tabs, makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import { mainColor } from '../../config/constants';
const TapStyle = styled(Tabs)`
    .MuiTab-textColorPrimary.Mui-selected {
        color: black;
        outline: none;
    }
    .Mui-selected {
        background-color: #4d6978;
    }
    .MuiAppBar-colorPrimary {
        color: #ffff;
        background-color: #005697;
    }
    .button:not(:disabled),
    [type='button']:not(:disabled),
    [type='reset']:not(:disabled),
    [type='submit']:not(:disabled) {
        outline: none;
    }

    .MuiTab-wrapper {
        color: white;
    }

    .MuiTabs-scroller {
        span.MuiTabs-indicator {
            background-color: #005697;
        }
    }
`;

const useStyles = makeStyles((theme) => ({
    TabClasses: {
        textTransform: 'capitalize',
        outline: 'none',
        fontSize: '16px',
        minWidth: 'auto',
        '&:hover': {
            boxShadow: '0px 0px 3px 1px',
            border: '4px',
            borderBottomStyle: 'solid',
            borderBottomColor: {mainColor},
        },
    },
}));

export default function CustomAppBar(props) {
    const { labels, setSelectedTab } = props;
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const tabHandleChange = (event, newValue) => {
        setValue(newValue);
        setSelectedTab(newValue);
    };

    return (
        <AppBar position="static">
            <TapStyle
                value={value}
                style={{
                    backgroundColor: {mainColor},
                }}
                onChange={tabHandleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                {labels.map((label, i) => {
                    return (
                        <Tab
                            key={i}
                            hidden={label == null ? true : false}
                            className={classes.TabClasses}
                            label={label}
                            {...a11yProps(i)}
                        />
                    );
                })}
            </TapStyle>
        </AppBar>
    );
}
function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}
