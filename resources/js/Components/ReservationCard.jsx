import React from "react";
import { CiUser } from "react-icons/ci";
import { MdOutlineBedroomChild } from "react-icons/md";
import { CgCalendarDates } from "react-icons/cg";

const ReservationCard = ({ reservation, users, rooms }) => {
    const user = users.find((user) => user.id === reservation.user_id);
    const room = rooms.find((room) => room.id === reservation.room_id);

    return (
        <div className="shadow-2xl bg-gray-100 border-gray-400 rounded-3xl flex flex-col justify-center items-center gap-4 p-6 hover:scale-95 transition ease duration-700">
            <div className="flex justify-center items-center gap-2">
                <CiUser size={20} />
                <p className="font-bold text-lg">Reservated by: </p>
                <p className="ml-4"> {user ? user.name : "Unknown User"}</p>
            </div>
            <div className="flex justify-center items-center gap-2">
                <MdOutlineBedroomChild size={20} />
                <p className="font-bold text-lg">Room:</p>
                <p className="ml-4">{room ? room.name : "Unknown Room"}</p>
            </div>
            <div className="flex justify-center items-center gap-2">
                <CgCalendarDates size={20} />
                <p className="font-bold text-lg">Dates:</p>
                <p className="ml-4">
                    {reservation.start_date} - {reservation.end_date}
                </p>
            </div>
        </div>
    );
};

export default ReservationCard;
