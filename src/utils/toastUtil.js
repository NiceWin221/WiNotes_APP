import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const customToast = (message, type, theme) => {
  const toastConfig = {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    toastId: "custom-toast",
    style: {
      backgroundColor: theme === "dark" ? "#111417" : "#eeebe8",
      color: theme === "dark" ? "#929498" : "#25282c",
    },
  };

  if (type === "error") {
    toast.error(message, toastConfig);
  } else {
    toast.success(message, toastConfig);
  }
};

export default customToast;
