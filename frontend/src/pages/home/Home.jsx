import { Badge, Box, Button, CircularProgress, IconButton, Stack } from '@mui/material';
import './Home.css';
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


const StyledBadge = styled(Badge)(() => ({
    '& .MuiBadge-badge': {
        backgroundColor: "#1976d2",
        color: "white"
    },
}));



const Home = () => {

    const navigate = useNavigate()
    const theme = useTheme()

    const { data, error, isLoading } = useGetproductsByNameQuery('')

    const dispatch = useDispatch()

    // @ts-ignore
    const { selectedProducts, selectedProductsID } = useSelector((state) => state.cartt)

    const productQuantity = (itemAPI) => {
        const myProduct = selectedProducts.find((item) => {
            return item.id === itemAPI.id
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
                            className='card'
                            sx={{ maxWidth: 277, mb: 4, mx: 2 }}>
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
                                {
                                    selectedProductsID.includes(item.id) ? // 
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
                                                badgeContent={productQuantity(item)}
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
                                        : // else
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                dispatch(addToCart(item))
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
