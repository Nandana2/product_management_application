import { BASE_URL } from "./baseURL"
import { commonAPI } from "./commonAPI"



export const registerAPI = async (data) => {
return await commonAPI("POST",`${BASE_URL}/register`,data,"" )
}

export const loginAPI = async (data) => {
return await commonAPI("POST",`${BASE_URL}/login`,data,"")
}


export const addCategoryAPI = async (data,reqHeader) => {
return await commonAPI("POST",`${BASE_URL}/category`,data,reqHeader
    )
}

export const getCategoryAPI = async () => {
return await commonAPI("GET",`${BASE_URL}/category`,"","" )}



export const addSubCategoryAPI = async (data,reqHeader) => {
return await commonAPI( "POST",`${BASE_URL}/subcategory`,data,reqHeader )}

export const getSubCategoryAPI = async () => {
return await commonAPI("GET",`${BASE_URL}/subcategory`,"","")}



export const addProductAPI = async (data,reqHeader
) => {
return await commonAPI("POST",`${BASE_URL}/product`,data,reqHeader  )
}

export const getProductsAPI = async (search = "", page = 1, subCategory = "", limit = 10) => {
     return await commonAPI("GET", `${BASE_URL}/products?search=${search}&page=${page}&subCategory=${subCategory}&limit=${limit}`, "", "")
   }

export const getSingleProductAPI = async ( id) => {
  return await commonAPI("GET",`${BASE_URL}/product/${id}`,"",  "" )
}

export const updateProductAPI = async (id,reqBody,reqHeader
) => {

    return await commonAPI("PUT",`${BASE_URL}/product/${id}`,reqBody,
        reqHeader
    )
}

export const deleteProductAPI = async (id, reqHeader) => {
    return await commonAPI("DELETE", `${BASE_URL}/product/${id}`, {}, reqHeader)
}



export const addWishlistAPI = async (reqBody,reqHeader) => {

    return await commonAPI("POST",`${BASE_URL}/wishlist`,reqBody, reqHeader
    )
}

export const getWishlistAPI = async (reqHeader) => {

    return await commonAPI("GET",`${BASE_URL}/wishlist`,"", reqHeader )
}

export const deleteWishlistAPI = async (id,reqHeader) => {

    return await commonAPI(
        "DELETE",
        `${BASE_URL}/wishlist/${id}`,
        {},
        reqHeader
    )
}