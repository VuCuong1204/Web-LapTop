import { baseService } from "../baseService";

export class BillService extends baseService  {
    getListBillById = (data) => {
        return this.post(`/bill_id.php`,data);
    }

    changeStatusBill = (data) => {
        return this.post('/bill_edit_status.php',data)
    }
}

export const billservice = new BillService();