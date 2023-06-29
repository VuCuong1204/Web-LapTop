import { baseService } from "../baseService";

export class CheckOutService extends baseService {
    getListProductChoose = (data) => {
        return this.post('/cart_list.php',data)
    }
}

export const checkoutservice = new CheckOutService();