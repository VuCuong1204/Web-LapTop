import { baseService } from "../baseService";

export class BillAdminService extends baseService  {
    getListBill = (data) => {
        return this.post(`/bill.php`,data);
    }
}

export const billadminservice = new BillAdminService();