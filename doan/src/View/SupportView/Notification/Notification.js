import { NotificationManager } from "react-notifications";

export const openNotification = (type, message) => {
  switch (type) {
    case "INFO":
      NotificationManager.info(message, "Thông tin");
      break;
    case "SUCCESS":
      NotificationManager.success(message, "Thành công");
      break;
    case "WARNING":
      NotificationManager.warning(message, "Cảnh báo");
      break;
    case "ERROR":
      NotificationManager.error(message, "Lỗi");
      break;
    default:
      break;
  }
};
