import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center px-1 pt-1 hover:text-gray-400 text-sm font-medium leading-5 transition duration-300 ease-in-out focus:outline-none " +
                (active
                    ? "border-indigo-400 text-yellow-600 focus:border-indigo-700 "
                    : "border-transparent text-gray-900 hover:text-gray-400 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 ") +
                className
            }
        >
            {children}
        </Link>
    );
}
