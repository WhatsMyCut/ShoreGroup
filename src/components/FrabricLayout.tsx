import React from 'react';
import { Fabric } from 'office-ui-fabric-react';
import NavBar from './ui/NavBar';
import SidebarMenu from './ui/SidebarMenu';
import Content from './ui/Content';
import Footer from './ui/Footer';

const FrabricLayout = () => (
  <Fabric className="App">
    <div className="header">
      <NavBar />
    </div>
    <div className="body">
      <div className="content">
        <Content />
      </div>
      <div className="sidebar">
        <SidebarMenu />
      </div>
    </div>
    <div className="footer">
      <Footer />
    </div>
  </Fabric>
);

export default FrabricLayout;
