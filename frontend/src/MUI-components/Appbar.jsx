import React from 'react';
import { Avatar, Link, AppBar, Typography, Toolbar, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';

const Appbar = ({ drawerWidth, showDrawer }) => {
    return (
        <AppBar
            sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}
            position="static">
            <Toolbar>
                <IconButton
                    sx={{ display: { sm: "none" }, mr: "8px", color: "inherit" }}
                    onClick={() => {
                        showDrawer()
                    }}
                    aria-label="">
                    <Menu />
                </IconButton>

                <Link
                    sx={{
                        flexGrow: 1,
                        textDecoration: "none",
                        "&:hover": { fontSize: "17px", transition: ".2s" }
                    }}
                    color="inherit"
                    href="/">
                    Online Shop
                </Link>

                <Typography
                    sx={{ mr: "16px" }}
                    variant="subtitle1"
                    component="h2"
                    color="inherit">
                    Mox Mustermann
                </Typography>

                <Avatar alt="Bild" src="..\images\avatar.jpg" />
            </Toolbar>
        </AppBar>
    );
}

export default Appbar;
