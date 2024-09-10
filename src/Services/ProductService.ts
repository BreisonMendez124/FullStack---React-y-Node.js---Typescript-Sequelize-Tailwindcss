import { safeParse } from "valibot"
import { DraftProductSchema, ProductsSchema, Product, ProductSchema } from "../types"
import axios from "axios"
import { toBoolean } from "../utils"

type ProductData = { 
    [ k: string ]: FormDataEntryValue
}

export async function addProduct( data : ProductData ) {
    console.log("🚀 ~ addProduct ~ data:", data)
    try{ 
        const result = safeParse( DraftProductSchema , { 
            name: data.name,
            price: +data.price
        })
        console.log( result )
        if( result.success ){ 
            const url =`${import.meta.env.VITE_API_URL}/api/products`;
            await axios.post( url ,  result.output )

        }else {  throw new Error('Datos no validos'); }
    }catch( error ){ 
        console.log("🚀 ~ addProduct ~ error:", error)
    }
}

export async function getProducts( ){
    try {
        const url =`${import.meta.env.VITE_API_URL}/api/products`;
        const { data } = await axios.get( url )
        const result = safeParse( ProductsSchema , data.data )
        if( result.success ){ 
            return result.output
        }else {  throw new Error('Datos no validos'); }
    } catch (error) {
        console.log("🚀 ~ getProducts ~ error:", error)
    }
}

export async function getProductById( id: Product['id'] ){
    try {
        const url =`${import.meta.env.VITE_API_URL}/api/products/${id}`;
        const { data } = await axios.get( url )
        const result = safeParse( ProductSchema , data.data )
        if( result.success ){ 
            return result.output
        }else {  throw new Error('Datos no validos'); }
    } catch (error) {
        console.log("🚀 ~ getProducts ~ error:", error)
    }
}

export async function editProduct( data : ProductData , id: Product['id'] ) {
    console.log("🚀 ~ addProduct ~ data:", data)
    try{ 
        const result = safeParse( ProductSchema , { 
            id: id,
            name: data.name,
            price: +data.price,
            availability: toBoolean( data.availability.toString() ),
        })
        if( result.success ){ 
            const url =`${import.meta.env.VITE_API_URL}/api/products/${id}`;
            await axios.put( url , result.output )

        }else {  throw new Error('Datos no validos'); }
    }catch( error ){ 
        console.log("🚀 ~ addProduct ~ error:", error)
    }
}

export async function deleteProduct( id: Product['id'] ){
    const url =`${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.delete( url );
}
