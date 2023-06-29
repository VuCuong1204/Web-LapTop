import { baseService } from "../baseService";

export class BillAdminService extends baseService  {
    getListBill = (data) => {
        return this.post(`/bill.php`,data);
    }

    changeStatusBillAdmin = (data) => {
        return this.post('/bill_edit_status_all.php',data)
    }

    changeStatusPaymentBillAdmin = (data) => {
        return this.post('/bill_edit_statusPayment.php',data)
    }

    completeBill = (data) =>{
        return this.post('/bill_edit_status.php',data)
    }

}

export const billadminservice = new BillAdminService();