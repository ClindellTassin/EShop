import { Typography, Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import { CardCvcElement, CardExpiryElement, CardNumberElement } from "@stripe/react-stripe-js";
import { StripeInput } from "./StripeInput";
import { StripeElementType } from "@stripe/stripe-js";

interface Props {
    cardState: { elementError: { [key in StripeElementType]?: string } };
    onCardInputChange: (event: any) => void;
}

export default function PaymentForm({ cardState, onCardInputChange }: Props) {
    const { control } = useFormContext();

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Payment Method
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <AppTextInput control={control} name="nameOnCard" label="Name On Card" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="cardNumber"
                        label="Card Number"
                        fullWidth
                        autoComplete="cc-number"
                        variant='outlined'
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            inputComponent: StripeInput,
                            inputProps: {
                                component: CardNumberElement
                            }
                        }}
                        onChange={onCardInputChange}
                        error={!!cardState.elementError.cardNumber}
                        helperText={cardState.elementError.cardNumber}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="expDate"
                        label="Expiration Date"
                        fullWidth
                        autoComplete="cc-exp"
                        variant='outlined'
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            inputComponent: StripeInput,
                            inputProps: {
                                component: CardExpiryElement
                            }
                        }}
                        onChange={onCardInputChange}
                        error={!!cardState.elementError.cardExpiry}
                        helperText={cardState.elementError.cardExpiry}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="cvv"
                        label="CVV"
                        fullWidth
                        autoComplete="cc-csc"
                        variant='outlined'
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            inputComponent: StripeInput,
                            inputProps: {
                                component: CardCvcElement
                            }
                        }}
                        onChange={onCardInputChange}
                        error={!!cardState.elementError.cardCvc}
                        helperText={cardState.elementError.cardCvc}
                    />
                </Grid>
            </Grid>
        </>
    );
}