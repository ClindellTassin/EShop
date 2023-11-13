import { useEffect } from "react";
import ProductList from "./ProductList";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProducts, productSelectors } from "./catalogSlice";

const Catalog = () => {
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, status } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProducts());
    }, [productsLoaded, dispatch]);

    if (status.includes('pending')) return <LoadingComponent message="loading catalog..." />

    return (
        <>
            <ProductList products={products} />
        </>
    )
}

export default Catalog