import { baseService } from "../baseService";

export class CheckOutService extends baseService {
    getListProductChoose = (data) => {
        return this.post('/cart_list.php',data)
    }

    changeStatusCart = (data) => {
        return this.post('/cart_update_status.php',data)
    }

    addnewBill = (data) => {
        return this.post('/bill_add.php',data)
    }

    addCartBill = (data) => {
        return this.post('/invoice_detail_add.php',data)
    }
}

export const checkoutservice = new CheckOutService();