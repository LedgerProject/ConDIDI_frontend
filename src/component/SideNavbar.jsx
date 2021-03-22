import React, { Component } from 'react'; 
import { Link } from 'react-router-dom'; 
import { ProSidebar, SidebarHeader, SidebarContent, Menu, MenuItem, SubMenu, SidebarFooter } from 'react-pro-sidebar';
import { Home, DateRangeOutlined, Settings, ViewHeadline, AddCircleOutline } from '@material-ui/icons'
import { Logout } from './index'; 


class SideNavbar extends Component {

  constructor(props) {
    super(props); 

    this.state = {
      isLoggedIn: true, 
    } 

    this.handleLogout = this.handleLogout.bind(this); 
    this.handleLogin = this.handleLogin.bind(this); 

  }

  componentDidMount() {

    if(this.props.isLoggedIn) {
      this.setState({
        isLoggedIn: true, 
      })
    } else {
      this.setState({
        isLoggedIn: false, 
      })
    }
      
  }

  handleLogout() {
    this.setState({
      isLoggedIn: false, 
    })
    this.props.logout(); 

  }

  handleLogin(e) {
    this.setState({
      isLoggedIn: true, 
      token: e.token, 
    })
  }

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
                    <Link to="/" /> 
                  </MenuItem>
                  <MenuItem icon={<DateRangeOutlined />}>
                    <Link to="/calendar" /> 
                  </MenuItem>
                  <MenuItem icon={<ViewHeadline/>}>
                      <Link to="/admin/my_events" /> 
                    </MenuItem>
                    <MenuItem icon={<AddCircleOutline />}>
                      <Link to="/admin/create_event" /> 
                    </MenuItem>
                    {/** 
                  <SubMenu icon={<Settings />}>
                    
                    <MenuItem >
                      Admin Area
                      <Link to="/admin" /> 
                    </MenuItem>
                    
                  </SubMenu>
                  */}
                  <MenuItem icon={<Settings />}>
                    <Link to="/impressum" /> 
                  </MenuItem>
                  
                </Menu>
              </div>
            </SidebarContent>

            <SidebarFooter>
              {this.props.token && <Logout isLoggedIn={this.state.isLoggedIn} token={this.state.token} handleLogout={this.handleLogout} /> } 
            </SidebarFooter>

          </ProSidebar>
        </div>
      )
    }
}

export default SideNavbar; 