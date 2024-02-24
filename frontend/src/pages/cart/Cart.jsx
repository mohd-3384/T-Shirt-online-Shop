import { Box, Paper, IconButton, Badge, styled, useTheme, Typography, Divider, Stack, Button, CardMedia } from '@mui/material';
import './Cart.css';
import { Add, Delete, Remove } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, deleteProduct, increaseQuantity } from '../../Redux/cardSlice';


const StyledBadge = styled(Badge)(() => ({
    '& .MuiBadge-badge': {
        backgroundColor: "#1976d2",
        color: "white"
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
                        sx={{ maxWidth: "60vw", width: "600px", p: 2, display: "flex", justifyContent: "space-between", flexDirection: "row", alignItems: "center", mb: 5, borderTop: "1px solid #1976d2", borderBottom: "1px solid #1976d2" }}
                        key={item.id}>
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
                                sx={{ color: "#1976d2", mr: 1.5 }}
                                aria-label=""
                                onClick={() => {
                                    dispatch(increaseQuantity(item))
                                }}>
                                <Add />
                            </IconButton>

                            <StyledBadge
                                badgeContent={item.quantity}
                                color="secondary" />

                            <IconButton
                                sx={{ color: "#1976d2", ml: 1.5 }}
                                aria-label=""
                                onClick={() => {
                                    dispatch(decreaseQuantity(item))
                                }}>
                                <Remove />
                            </IconButton>
                        </Stack>

                        <Typography
                            variant='body1'>
                            {Number(item.price) * Number(item.quantity)} €
                        </Typography>

                        <IconButton
                            sx={{ color: theme.palette.error.main, ml: 1 }}
                            aria-label=""
                            onClick={() => {
                                dispatch(deleteProduct(item))
                            }}>
                            <Delete />
                        </IconButton>
                    </Paper>
                )
            })}



            <Paper
                sx={{ width: "240px", mx: "auto", mt: 8 }}>
                <Typography
                    align='center'
                    variant="h5" p={2} >
                    Warenkorb
                </Typography>

                <Divider />

                <Stack
                    direction={"row"}
                    sx={{ justifyContent: "space-around", p: 1.2 }}>
                    <Typography
                        variant="body1">
                        Summe:
                    </Typography>
                    <Typography
                        variant="body1">
                        {summe} €
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
