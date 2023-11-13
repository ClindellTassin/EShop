import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { currencyFormat } from "../../app/util/util";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItem, removeBasketItem } from "../basket/basketSlice";
import { fetchProduct, productSelectors } from "./catalogSlice";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { basket, status } = useAppSelector(state => state.basket);
  const { status: productStatus } = useAppSelector(state => state.catalog);
  const product = useAppSelector(state => productSelectors.selectById(state, id!));
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(0);
  const item = basket?.items.find(i => i.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    if (!product && id) dispatch(fetchProduct(parseInt(id)));
  }, [item, product, id, dispatch]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (parseInt(event.currentTarget.value) >= 0) {
      setQuantity(parseInt(event.currentTarget.value));
    }
  };

  const handleUpdateCart = () => {
    if (!product) return;
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(addBasketItem({ productId: product.id, quantity: updatedQuantity }));
    } else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(removeBasketItem({ productId: product.id, quantity: updatedQuantity }));
    }
  };

  if (productStatus.includes('pending')) return <LoadingComponent message="loading product..." />

  if (!product) return <NotFound />

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
      </Grid>
      <Grid item xs={6}>
        <Typography variant='h3'>{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant='h4' color='secondary'>{currencyFormat(product.price)}</Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity In Stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant='outlined'
              type='number'
              label='Quantity In Cart'
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={item?.quantity === quantity || !item && quantity === 0}
              loading={status.includes('pending' + item?.productId)}
              sx={{ height: '55px' }}
              color='primary'
              size='large'
              variant='contained'
              fullWidth
              onClick={handleUpdateCart}
            >
              {item ? 'Update Quantity' : 'Add To Cart'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProductDetails