import { baseService } from "../baseService";

export class CartService extends baseService {
    getListCart = (data) => {
        return this.post("/cart_list.php", data)
    }

    addCart = (data) => {
        return this.post("/cart_add.php", data)
    }

    deleteCart = (data) => {
        return this.post("/cart_delete.php", data)
    }

    updateAddressCart = (data) => {
        return this.post("/cart_update_address.php", data)
    }

    updateStatusCart = (data) => {
        return this.post("/cart_update_status.php", data)
    }

    updateQuantity = (data) => {
        return this.post("/cart_update_quatity.php", data)
    }
}

export const cartservice = new CartService()