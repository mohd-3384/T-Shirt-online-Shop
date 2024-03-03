import { Badge, Box, Button, CircularProgress, IconButton, Stack } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { useGetproductsByNameQuery } from '../../Redux/productsApi'
import { addToCart, decreaseQuantity, increaseQuantity } from '../../Redux/cardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Add, Remove } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: `${theme.palette.primary.main}`,
        color: `${theme.palette.primary.contrastText}`,
        fontWeight: 'bold'
    },
}));



const Home = () => {

    const navigate = useNavigate()
    const theme = useTheme()

    const { data, error, isLoading } = useGetproductsByNameQuery()

    const dispatch = useDispatch()

    // @ts-ignore
    const { selectedProducts, selectedProductsID } = useSelector((state) => state.cartt)

    const productQuantity = (itemAPI) => {
        const myProduct = selectedProducts.find((itemUser) => {
            return itemUser.id === itemAPI.id
        })
        return myProduct.quantity
    }




    // Loading
    if (isLoading) {
        return (
            <Box
                sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }


    // Error
    if (error) {
        return (
            <Box
                sx={{ display: 'flex' }}>
                <Typography variant="h1" color="error">ERROR</Typography>
            </Box>
        )
    }


    // Data
    if (data) {
        return (
            <Stack
                direction={"row"}
                sx={{ flexWrap: "wrap", justifyContent: "center", mt: 4 }} >

                {data.map((item) => {
                    return (
                        <Card
                            key={item.id}
                            sx={{ maxWidth: 277, mb: 4, mx: 2, '&:hover': { rotate: '.5deg', scale: '1.01', transition: '.3s' } }}>
                            <CardMedia
                                sx={{ '&:hover': { cursor: 'pointer' } }}
                                component="img"
                                height="277"
                                image={item.imageLink[0]}
                                alt="T-Shirt"
                                onClick={() => {
                                    navigate(`product-details/${item.id}`)
                                }}
                            />

                            <CardContent>
                                <Typography
                                    variant="body2"
                                    color="text.secondary">
                                    {item.description}
                                </Typography>
                            </CardContent>

                            <CardActions
                                sx={{ justifyContent: "space-between" }}
                                disableSpacing>
                                {selectedProductsID.includes(item.id) ?
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
                                            badgeContent={productQuantity(item)} // from cardSlice.js
                                        />

                                        <IconButton
                                            sx={{ color: theme.palette.primary.main, ml: 1.5 }}
                                            aria-label=""
                                            onClick={() => {
                                                dispatch(decreaseQuantity(item)) // from cardSlice.js
                                            }}>
                                            <Remove />
                                        </IconButton>
                                    </Stack>
                                    : // else
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            dispatch(addToCart(item)) // from cardSlice.js
                                        }}>
                                        In den Warenkorb
                                    </Button>
                                }

                                <Typography
                                    mr={1}
                                    variant="body1"
                                    color={theme.palette.error.light}>
                                    {item.price} €
                                </Typography>
                            </CardActions>
                        </Card>
                    )
                })}
            </Stack>
        );
    }
}
export default Home;
