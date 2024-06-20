import React from "react";
import { Link } from "@inertiajs/react";

const Pagination = ({ reservations }) => {
    const { links } = reservations;

    const prevLink = links.find((link) => link.label === "&laquo; Previous");
    const nextLink = links.find((link) => link.label === "Next &raquo;");

    return (
        <div className="flex justify-center gap-2">
            {prevLink && prevLink.url ? (
                <Link
                    href={prevLink.url}
                    className="hover:scale-110 transition ease duration-300 hover:bg-black/10 hover:shadow-xl inline-flex items-center border border-black-300 px-3 py-1.5 rounded-md text-black-500 hover:bg-black-50"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16l-4-4m0 0l4-4m-4 4h18"
                        ></path>
                    </svg>
                    <span className="ml-1 font-bold text-lg">Back</span>
                </Link>
            ) : (
                <div className="inline-flex items-center border border-black-300 px-3 py-1.5 rounded-md text-black-300 cursor-not-allowed">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16l-4-4m0 0l4-4m-4 4h18"
                        ></path>
                    </svg>
                    <span className="ml-1 font-bold text-lg">Back</span>
                </div>
            )}

            {nextLink && nextLink.url ? (
                <Link
                    href={nextLink.url}
                    className="hover:scale-110 transition ease duration-300 hover:bg-black/10 hover:shadow-xl inline-flex items-center border border-black-300 px-3 py-1.5 rounded-md text-black-500 hover:bg-black-50"
                >
                    <span className="mr-1 font-bold text-lg">Next</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        ></path>
                    </svg>
                </Link>
            ) : (
                <div className="inline-flex items-center border border-black-300 px-3 py-1.5 rounded-md text-black-300 cursor-not-allowed">
                    <span className="mr-1 font-bold text-lg">Next</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        ></path>
                    </svg>
                </div>
            )}
        </div>
    );
};

export default Pagination;
