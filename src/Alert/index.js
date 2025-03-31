import Swal from "sweetalert2";
/**
 *
 * @param {*} message
 */
export const showSuccess = (message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    showCloseButton: true,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  Toast.fire({
    icon: "success",
    title: message,
  });
};

/**
 *
 * @param {*} message
 */
export const showError = (message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    showCloseButton: true,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  Toast.fire({
    icon: "error",
    title: message,
  });
};


export const Toast = Swal.mixin({
  toast: false,
  icon: "question",
  showCancelButton: true,
  confirmButtonText: 'Yes',
})