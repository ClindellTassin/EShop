import { Grid } from "@mui/material"
import ProductCard from "./ProductCard";
import { Product } from "../../app/models/product";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
    products: Product[];
}

const ProductList = ({ products }: Props) => {
    const { productsLoaded } = useAppSelector(state => state.catalog);

    return (
        <Grid container spacing={4}>
            {products.map(product => (
                <Grid key={product.id} item xs={4}>
                    {!productsLoaded ? (
                        <ProductCardSkeleton />
                    ) : (
                        <ProductCard product={product} />
                    )}
                </Grid>
            ))}
        </Grid>
    )
}

export default ProductList