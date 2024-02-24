import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Appbar from '../MUI-components/Appbar';
import DrawerComp from '../MUI-components/Drawer';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import getDesignTokens from '../styles/MyTheme';



const drawerWidth = 240;

const Root = () => {

    const themeLocalSt = localStorage.getItem("currentMode") === null ? "dark"
        : localStorage.getItem("currentMode") === "light" ? "light"
            : "dark"
    const [mode, setmyMode] = useState(themeLocalSt)

    const [noneORblock, setnoneORblock] = useState("none")
    const [drawerTyp, setdrawerTyp] = useState("permanent")

    const showDrawer = () => {
        setdrawerTyp("temporary")
        setnoneORblock("block")
    }

    const closeDrawer = () => {
        setdrawerTyp("permanent")
        setnoneORblock("none")
    }

    const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]); // Dark Mode MUI

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div>
                <Appbar {...{ drawerWidth, showDrawer }} />

                <DrawerComp {...{ drawerWidth, setmyMode, noneORblock, drawerTyp, closeDrawer }} />

                <Box
                    component="main"
                    sx={{
                        ml: { sm: `${drawerWidth}px` },
                        mt: 2,
                        display: "flex",
                        justifyContent: "center",
                    }}>

                    <Outlet />
                </Box>
            </div>
        </ThemeProvider>
    );
}

export default Root;
