import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import getProductById from "@/actions/getProductById";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface IParams {
    productId?: string;
}

const Product = async({ params }: { params: IParams }) => {
    const product = await getProductById(params);
    const user = await getCurrentUser();

    if (!product) {
        return (
            <div className="p-8">
                <Container>
                    <div className="text-center text-xl text-slate-500">
                        Product not found
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="p-8">
            <Container>
                <ProductDetails product={product} />
                <div>
                    <div className="flex flex-col mt-20 gap-4">
                        <AddRating product={product} user={user}/>
                        <ListRating product={product} />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Product;
