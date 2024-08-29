import { Link, useLoaderData } from "react-router-dom";
import { getProducts } from "../Services/ProductService";
import { Product } from "../types";
import ProductDetails from "../components/ProductDetails";

export const loader = async () => await getProducts()

export default function Products() {
    const products = useLoaderData() as Product[];
    return (
        <>
            <div className="flex justify-between">

                <h2 className="text-4xl font-black">Productos </h2>
                <Link
                    to="productos/nuevo"
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
                >
                    Agregar Producto
                </Link>
            </div>

            <div className="p-2">
                <table className="w-full mt-5 table-auto">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="p-2">Producto</th>
                            <th className="p-2">Precio</th>
                            <th className="p-2">Disponibilidad</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        { products.map( ( product ) => ( 
                            <ProductDetails
                                key={ product.id }
                                product={ product }
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}