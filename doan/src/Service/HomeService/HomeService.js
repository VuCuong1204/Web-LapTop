import { baseService } from "../baseService";

export class HomeService extends baseService {
    getListProductType = () => {
        return this.get(`/get_info_product.php`);
    }

    getListProduct = () => {
        return this.get(`/get_info_product_detail_list.php`);
    }
}

export const homeservice = new HomeService();