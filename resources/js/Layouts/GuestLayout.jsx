import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[radial-gradient(ellipse_at_29%_32%,_rgba(255,_233,_188,_1)_0%,_rgba(237,_206,_91,_0.91)_50%,_rgba(206,_111,_111,_1)_100%)]">
            <div>
                <Link href="/">
                    <ApplicationLogo
                        className=" fill-current text-gray-500"
                        size={50}
                    />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
