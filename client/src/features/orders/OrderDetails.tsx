import { Box, Button, Grid, Typography } from "@mui/material";
import { Order } from "../../app/models/order"
import BasketTable from "../basket/BasketTable";
import { BasketItem } from "../../app/models/basket";
import BasketSummary from "../basket/BasketSummary";

interface Props {
    order: Order;
    setSelectedOrder: (id: number) => void;
}

const OrderDetails = ({ order, setSelectedOrder }: Props) => {
    const subtotal = order.orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;

    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography variant='h4' sx={{ p: 2 }} gutterBottom>Order# {order.id} - {order.orderStatus}</Typography>
                <Button variant='contained' size='large' sx={{ m: 2 }} onClick={() => setSelectedOrder(0)}>Back To Orders</Button>
            </Box>
            <BasketTable items={order.orderItems as BasketItem[]} isBasket={false} />
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary subtotal={subtotal} />
                </Grid>
            </Grid>
        </>
    )
}

export default OrderDetails