import { baseService } from "../baseService";

export class GlobalService extends baseService {
    login = (data) => {
       return this.post(`/login.php`,data);
    }
}

export const globalservice = new GlobalService();