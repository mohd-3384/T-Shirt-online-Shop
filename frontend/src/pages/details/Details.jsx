import React from 'react';
import './details.css'
import { useGetOneProductQuery } from '../../Redux/productsApi';
import { useParams } from 'react-router-dom';
import { Badge, Box, Button, CircularProgress, IconButton, Stack, Typography, styled, useTheme } from '@mui/material';
import { useRef, useState } from "react";
import DetailsThumb from './DetailsThumb'
import { Add, Remove } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseQuantity, increaseQuantity } from '../../Redux/cardSlice';




const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: `${theme.palette.primary.main}`,
        color: `${theme.palette.primary.contrastText}`,
        fontWeight: 'bold'
    },
}));






const Details = () => {

    const theme = useTheme()

    let { id } = useParams();
    const { data, error, isLoading } = useGetOneProductQuery(id)

    const [index, setindex] = useState(0);
    const myRef = useRef(null);

    const handleTab = (index) => {
        setindex(index);
        const images = myRef.current.children;
        for (let i = 0; i < images.length; i++) {
            images[i].className = images[i].className.replace("active", "");
        }
        images[index].className = "active";
    };

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
            <div className="app details-page">
                <div className="details">
                    <div className="big-img">
                        <img
                            src={data.imageLink[index]}
                            alt="" />
                    </div>

                    <div className="box">
                        <div className="row">
                            <h2>{data.productName}</h2>
                            <span
                                style={{ color: theme.palette.error.light, fontWeight: "bold" }}>
                                {data.price} €
                            </span>
                        </div>

                        <p>{data.description}</p>

                        <DetailsThumb
                            images={data.imageLink}
                            tab={handleTab}
                            myRef={myRef}
                        />

                        {selectedProductsID.includes(data.id) ?
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                                sx={{ mt: 4.5 }}>
                                <IconButton
                                    sx={{ color: theme.palette.primary.main, mr: 1.5 }}
                                    aria-label=""
                                    onClick={() => {
                                        dispatch(increaseQuantity(data))
                                    }}>
                                    <Add />
                                </IconButton>

                                <StyledBadge
                                    badgeContent={productQuantity(data)} />

                                <IconButton
                                    sx={{ color: theme.palette.primary.main, ml: 1.5 }}
                                    aria-label=""
                                    onClick={() => {
                                        dispatch(decreaseQuantity(data))
                                    }}>
                                    <Remove />
                                </IconButton>
                            </Stack>
                            :
                            <Button
                                variant="contained"
                                sx={{ mt: 4 }}
                                onClick={() => {
                                    dispatch(addToCart(data))
                                }}>
                                In den Warenkorb
                            </Button>
                        }
                    </div>
                </div>
            </div>
        );
    }

}

export default Details;
