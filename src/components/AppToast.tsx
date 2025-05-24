import type { ReactNode } from "react";
import { Toast, ToastToggle } from "flowbite-react";

type ToastProps = {
  icon: ReactNode;
  message: string;
};

const AppToast = ({ icon, message }: ToastProps) => {
  return (
    <Toast>
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
        {icon}
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <ToastToggle />
    </Toast>
  );
};

export default AppToast;
