import { safeParse } from "valibot"
import { DraftProductSchema, ProductsSchema } from "../types"
import axios from "axios"

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