import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ReservationCard from "@/Components/ReservationCard";
import Pagination from "@/Components/Pagination";

const Reservations = ({ auth, reservations, users, rooms }) => {
    // const [showReservation, setShowReservation] = useState(false);

    // const handleShowReservation = () => {
    //     setShowReservation(true);
    // };

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Reservations" />

                <div className="p-12">
                    {reservations.length > 0 ? (
                        <div className="pb-14 grid sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-10 mt-6">
                            {reservations.data.map((res) => (
                                <div className="w-full" key={res.id}>
                                    <ReservationCard
                                        reservation={res}
                                        users={users}
                                        rooms={rooms}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-lg text-gray-600 w-full flex justify-center">
                            No reservations registrated
                        </div>
                    )}
                </div>
                <Pagination reservations={reservations} />
            </AuthenticatedLayout>
        </>
    );
};

export default Reservations;
