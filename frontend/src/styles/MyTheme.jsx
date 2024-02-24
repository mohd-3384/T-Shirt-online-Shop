const { grey, blue } = require("@mui/material/colors");

const getDesignTokens = (mode) => ({
    palette: {
        // @ts-ignore
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                spColor: {
                    main: blue[700],
                    mainHover: blue[400],
                },
                favColor: {
                    main: grey[400]
                }
            }
            : {
                // palette values for dark mode
                spColor: {
                    main: blue[600],
                    mainHover: blue[400],
                },
                favColor: {
                    main: grey[900]
                }
            }),
    },
});

export default getDesignTokens
