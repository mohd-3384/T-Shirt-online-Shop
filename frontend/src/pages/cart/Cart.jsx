import { Box, Paper, IconButton, Badge, styled, useTheme, Typography, Divider, Stack, Button, CardMedia } from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, deleteProduct, increaseQuantity } from '../../Redux/cardSlice';


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: `${theme.palette.primary.main}`,
        color: `${theme.palette.primary.contrastText}`,
        fontWeight: 'bold'
    },
}));



const Cart = () => {

    const theme = useTheme()

    const dispatch = useDispatch()

    // @ts-ignore
    const { selectedProducts } = useSelector((state) => state.cartt) // selectedProducts aus CardSlice.js  && cartt aus store.js

    let summe = 0


    return (
        <Box>

            {selectedProducts.map((item) => {
                summe += Number(item.price) * Number(item.quantity)
                return (
                    <Paper
                        sx={{
                            width: { xl: "650px", sm: "400px", xs: "95vw" }, p: 2, display: "flex", justifyContent: "space-between", flexDirection: "row", alignItems: "center", my: 5, borderTop: `2px solid ${theme.palette.primary.main}`
                        }}
                        key={item.id} >
                        <Stack
                            direction={"row"}
                            alignItems={"center"}
                            gap={1}>
                            <CardMedia
                                component="img"
                                sx={{ width: 75, height: 75, mr: 1 }}
                                image={item.imageLink[0]}
                                alt=""
                            />
                            <Typography
                                variant='body1'>
                                {item.productName}
                            </Typography>
                        </Stack>

                        <Stack
                            direction={"row"}
                            alignItems={"center"}>
                            <IconButton
                                sx={{ color: theme.palette.primary.main, mr: 1.5 }}
                                aria-label=""
                                onClick={() => {
                                    dispatch(increaseQuantity(item)) // from cardSlice.js
                                }}>
                                <Add />
                            </IconButton>

                            <StyledBadge
                                badgeContent={item.quantity} />

                            <IconButton
                                sx={{ color: theme.palette.primary.main, ml: 1.5 }}
                                aria-label=""
                                onClick={() => {
                                    dispatch(decreaseQuantity(item)) // from cardSlice.js
                                }}>
                                <Remove />
                            </IconButton>
                        </Stack>

                        <Typography
                            variant='body1'>
                            {Number((item.price) * Number(item.quantity)).toFixed(2)} €
                        </Typography>

                        <IconButton
                            sx={{ color: theme.palette.error.main, ml: 1 }}
                            aria-label=""
                            onClick={() => {
                                dispatch(deleteProduct(item)) // from cardSlice.js
                            }}>
                            <Delete />
                        </IconButton>
                    </Paper>
                )
            })}



            <Paper
                sx={{ width: "240px", mx: "auto", mt: 8, boxShadow: "0 0 3px #555" }}>
                <Typography
                    align='center'
                    variant="h5" p={2} >
                    Warenkorb
                </Typography>

                <Divider />

                <Stack
                    direction={"row"}
                    sx={{ justifyContent: "space-around", alignItems: "center", p: 1.2 }}>
                    <Typography
                        variant="h6">
                        Summe:
                    </Typography>
                    <Typography
                        variant="h6">
                        {summe.toFixed(2)} €
                    </Typography>
                </Stack>

                <Divider />

                <Button
                    fullWidth
                    color='primary'
                    variant='contained'>
                    Ausloggen
                </Button>
            </Paper>
        </Box >
    );
}

export default Cart;
