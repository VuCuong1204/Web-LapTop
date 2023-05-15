import { baseService } from "../baseService";

export class ProductService extends baseService {
    getProduct = (data) => {
        return this.post(`/get_product_detail.php`, data)
    }

    getProductDetail = (data) => {
        return this.post(`/get_product_according_to_ram.php`, data)
    }

    getListComment = (data) => {
        return this.post(`/rate_list.php`, data)
    }

    deleteComment = (data) => {
        return this.post(`/rate_delete.php`, data)
    }

    addComment = (data) => {
        return this.post(`/rate_add.php`, data)
    }

    updateComment = (data) => {
        return this.post(`/rate_edit.php`, data)
    }
}

export const productservice = new ProductService()