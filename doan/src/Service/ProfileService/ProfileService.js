import { baseService } from "../baseService";

export class ProfileServie extends baseService {
    changePassword = (data) => {
        return this.post(`/change_password.php`, data);
    }

    editProfile = (data) => {
        return this.post(`/edit_profile.php`, data);
    }
}

export const profileservice = new ProfileServie()