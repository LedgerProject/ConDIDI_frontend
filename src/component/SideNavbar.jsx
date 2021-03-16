import React, { Component } from 'react'; 
import { Link } from 'react-router-dom'; 
import { ProSidebar, SidebarHeader, SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Home, DateRangeOutlined, Settings } from '@material-ui/icons'


class SideNavbar extends Component {

  render() {
      return(
        <div className="sidebar" >
          <ProSidebar
            image={false}
            collapsed={false}
            breakPoint="sm"
            width='120'
          >

            <SidebarHeader>
              <div className='sidebar-header'> CNDD
              </div>
            </SidebarHeader>

            <SidebarContent>
              <div className='sidebar-content'>
                <Menu iconShape="rounded">
                  <MenuItem icon={<Home     />}>
                    <Link to="/home" /> 
                  </MenuItem>
                  <MenuItem icon={<DateRangeOutlined />}>
                    <Link to="/calendar" /> 
                  </MenuItem>
                  <SubMenu icon={<Settings />}>
                    <MenuItem >
                      Admin Area
                      <Link to="/admin" /> 
                    </MenuItem>
                    <MenuItem>
                      My Events
                      <Link to="/admin/my_events" /> 
                    </MenuItem>
                    <MenuItem>
                      Create Event
                      <Link to="/admin/create_event" /> 
                    </MenuItem>
                  </SubMenu>
                  
                </Menu>
              </div>
            </SidebarContent>

          </ProSidebar>
        </div>
      )
    }
}

export default SideNavbar; 