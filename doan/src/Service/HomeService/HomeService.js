import { baseService } from "../baseService";

export class HomeService extends baseService {
    getListProductType= () => {
        return this.get(`/get_info_product.php`);
    }
}

export const homeservice = new HomeService();