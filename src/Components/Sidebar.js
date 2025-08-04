// src/Components/Sidebar.js
import React, { useState } from "react";
import './Custom-Style/sidebar.css';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';


export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <div className={`sidebar-container ${isOpen ? "open" : "closed"}`}>
            <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large" onClick={() => setIsOpen(!isOpen)}></i>}>
                    <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                        KoTong
                    </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink to="/" className={({ isActive }) => isActive ? "activeClicked" : "nav-link"}>
                            <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/itemlist" className={({ isActive }) => isActive ? "activeClicked" : "nav-link"}>
                            <CDBSidebarMenuItem icon="table">Tables</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/additem" className={({ isActive }) => isActive ? "activeClicked" : "nav-link"}>
                            <CDBSidebarMenuItem icon="plus">Add Item</CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <div style={{ padding: '20px 5px' }}>
                        <button className="btn btn-danger w-100 d-flex align-items-center justify-content-center" onClick={handleLogout} title="Logout">
                            <i className="fas fa-sign-out-alt me-2"></i>
                            {isOpen && 'Logout'}
                        </button>
                        {isOpen && (
                            <div className="text-light mt-3">
                                THIS WEB MADE<br />BY<br />Calz.
                            </div>
                        )}
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );
}
