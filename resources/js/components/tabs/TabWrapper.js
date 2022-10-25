import { TabPanel } from "./TabPanel";
import * as React from 'react';
const TabWrapper = ({ children, index, selectedTab }) => (
    <div
        style={{
            display: selectedTab === index ? 'block' : 'none',
        }}
    >
        <TabPanel index={index} value={index}>
            {children}
        </TabPanel>
    </div>
);

export default React.memo(TabWrapper)