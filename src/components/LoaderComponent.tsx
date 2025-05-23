
import { Spinner } from "flowbite-react";

export function LoaderComponent() {
    return (<div className="w-screen h-screen flex items-center justify-center bg-white">
        <Spinner aria-label="Default status example" />;
    </div>
    )
}
