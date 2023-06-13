import { toast } from "react-toastify";

export function createNotification(type, message, title = "Driving") {
  switch (type) {
    case "info":
      toast.info(message, title, 500);
      break;
    case "success":
      toast.success(message, title);
      break;
    case "warning":
      toast.warning(message, title, 500);
      break;
    case "error":
      toast.error(message, title, 500);
      break;
    default:
      break;
  }
}
