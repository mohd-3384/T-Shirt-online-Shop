import React from 'react';
import { Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme, IconButton, Box, Badge, styled } from '@mui/material';
import { Brightness4, Brightness7, Home, ShoppingCart } from '@mui/icons-material';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));



const DrawerComp = ({ drawerWidth, setmyMode, noneORblock, drawerTyp, closeDrawer }) => {

    const navigate = useNavigate();

    const theme = useTheme();

    const currentLocation = useLocation();

    // @ts-ignore
    const { selectedProducts } = useSelector((state) => state.cartt) // selectedProducts aus CardSlice.js  && cartt aus store.js

    const myList = [
        { text: "Home", icon: <Home />, path: "/" },
        {
            text: "Warenkorb", icon:
                <StyledBadge
                    badgeContent={selectedProducts.length}
                    color="secondary">
                    <ShoppingCart />
                </StyledBadge>, path: "/cart"
        },
    ]



    return (
        <Box component="nav">
            <Drawer
                sx={{
                    display: { xs: noneORblock, sm: "block" },
                    width: `${drawerWidth}px`,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: `${drawerWidth}px`,
                        boxSizing: 'border-box',
                    },
                }}
                variant={drawerTyp}
                anchor="left"
                open={true}
                onClose={() => {
                    closeDrawer()
                }}>
                <List>
                    <ListItem /* theme button */
                        sx={{ display: "flex", justifyContent: "center", mb: "16px" }}
                        disablePadding>
                        <IconButton
                            onClick={() => {
                                localStorage.setItem("currentMode", theme.palette.mode === "dark" ? "light" : "dark")
                                setmyMode(theme.palette.mode === "dark" ? "light" : "dark")
                            }}
                            color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7 sx={{ color: "orange" }} /> : <Brightness4 />}
                        </IconButton>
                    </ListItem>

                    <Divider />

                    {myList.map((item) => {
                        return (
                            <ListItem
                                key={item.text}
                                // @ts-ignore
                                sx={{ bgcolor: currentLocation.pathname === item.path ? theme.palette.favColor.main : null }}
                                disablePadding>
                                <ListItemButton
                                    onClick={() => { navigate(item.path) }}>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        )
                    })}

                </List>
            </Drawer>
        </Box>
    );
}

export default DrawerComp;
