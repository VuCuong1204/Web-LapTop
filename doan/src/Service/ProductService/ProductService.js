import { baseService } from "../baseService";

export class ProductService extends baseService {
    getProduct = (data) => {
        return this.post(`/get_product_detail.php`,data)
    }

    getProductDetail = (data) => {
        return this.post(`/get_product_according_to_ram.php`,data)
    }
}

export const productservice = new ProductService()