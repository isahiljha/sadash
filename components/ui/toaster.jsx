import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { MdNoEncryptionGmailerrorred } from "react-icons/md";
import { PiWarningFill } from "react-icons/pi";
import { FaCircleCheck } from "react-icons/fa6";


export function Toaster() {
  const { toasts } = useToast()

  return (
    (<ToastProvider>
      {toasts.map(function ({ id, toastType, title, description, action, desUserName, ...props }) {
        return (
          (<Toast key={id} {...props}
            className={`
              ${toastType === "warning" && 'bg-yellow-400 dark:bg-yellow-500 shadow-lg text-dark font-semibold border-4 border-yellow-50 dark:border-dark/70 fixed top-4 lg:top-4 lg:right-4 w-[92%] lg:w-[350px]'}
              ${toastType === "error" && 'bg-red-400 shadow-lg dark:bg-red-500 text-white font-semibold border-4 border-red-50 dark:border-dark/70 fixed top-4 lg:top-4 lg:right-4 w-[92%] lg:w-[350px]'}
              ${toastType === "success" && 'bg-green-500 shadow-lg text-white font-semibold border-4 border-green-50 dark:border-dark/70 fixed top-4 lg:top-4 lg:right-4 w-[92%] lg:w-[350px]'}
              `}
          >
            <div className={`grid gap-1`}>
              {title && <ToastTitle className="flex items-center">
                {toastType === "warning" && <PiWarningFill className="inline h-5 w-5 me-1" />}
                {toastType === "error" && <MdNoEncryptionGmailerrorred className="inline h-5 w-5 me-1" />}
                {toastType === "success" && <FaCircleCheck className="inline h-5 w-5 me-2" />}
                {title}</ToastTitle>}
              {description && (
                <ToastDescription className={`${toastType === "error" && 'ms-6'}`}>{description}</ToastDescription>
              )}
              {desUserName && (
                <ToastDescription>{toastType === "success" && <div className="ms-7">Hii <span className="text-sm font-extrabold text-dark">{desUserName},</span> let's explore the Dashboard</div>}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose
              className={`
                ${toastType === "warning" && 'bg-yellow-50 dark:bg-dark/40 shadow-lg hover:bg-white'}
                ${toastType === "error" && 'bg-red-50 dark:bg-dark/40 shadow-lg hover:bg-white'}
                ${toastType === "success" && 'bg-green-50 dark:bg-dark/40 shadow-lg hover:bg-white'}
            `} />
          </Toast>)
        );
      })}
      <ToastViewport />
    </ToastProvider>)
  );
}
