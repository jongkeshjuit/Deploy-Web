import { useParams, useNavigate } from "react-router-dom";
import { collections } from "../assets/dummyData";
import ProductGrid from "../components/Products/ProductGrid";
function Collection() {
    const { id } = useParams();
    const collection = collections.find((c) => c.id === id);

    if (!collection) return <h2>Collection not found!</h2>;

    return (
        <div className="flex flex-col items-center justify-center">
            <img
                src={collection.bannerUrl}
                alt={collection.name}
                className="w-full aspect-[16/10] object-cover"
            />
            <h2 className="text-2xl font-medium mb-6 mt-10">{collection.name}</h2>
            <div className="w-full px-[50px]">
                <ProductGrid product={collection.products} />
            </div>
        </div>
    );
}

export default Collection;
