import { baseService } from "../baseService";

export class AddressService extends baseService {
    getListAddress = (data) => {
        return this.post(`/address_list.php`, data)
    }

    addAddress = (data) => {
        return this.post(`/insert_address.php`, data)
    }

    editAddress = (data) => {
        return this.post(`/update_info_address.php`, data)
    }

    editDefaultAddress = (data) => {
        return this.post(`/update_address.php`, data)
    }

    deleteAddress = (data) => {
        return this.post(`/delete_address.php`, data)
    }
}

export const addressservice = new AddressService();