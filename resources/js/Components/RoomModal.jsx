import React, { useState, useEffect } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import Datepicker from "react-tailwindcss-datepicker";
import { usePage, useForm } from "@inertiajs/react";
import { IoIosClose } from "react-icons/io";

const RoomModal = ({ auth, setShowRoom, room, reservedDates }) => {
    const { data, setData, post, reset, errors } = useForm({
        user_id: auth.id,
        room_id: room.id,
        start_date: null,
        end_date: null,
        visited: 0,
        email: auth.email,
    });
    const [datee, setDatee] = useState({ start_date: null, end_date: null });
    const [guestEmail, setGuestEmail] = useState(auth.email);

    const handleDateChange = (date) => {
        console.log(date);
        setDatee("start_date", date.startDate);
        setDatee("end_date", date.endDate);
    };

    useEffect(() => {
        console.log(datee);
        setData("start_date", datee.start_date);
        setData("end_date", datee.end_date);
        console.log(data);
    }, [datee.start_date, datee.end_date]);

    const isDateReserved = (date) => {
        return reservedDates.includes(date.format("YYYY-MM-DD"));
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setGuestEmail(email);
        setData("email", email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);

        post("/reservations", {
            onSuccess: () => setShowRoom(false),
        });
    };

    useEffect(() => {
        setData("email", guestEmail || auth.email);
    }, [guestEmail, auth.email]);

    return (
        <>
            <section className="w-full fixed left-0 top-0 flex flex-col justify-center items-center h-screen text-white">
                <div
                    className="w-full fixed bg-black/50 left-0 top-0 h-screen"
                    onClick={() => setShowRoom(false)}
                ></div>

                <div className="z-10 shadow-3xl bg-gray-100 border-gray-400 sm:max-w-xl sm:mx-auto sm:rounded-full flex flex-col justify-center items-center gap-2 p-5 scale-125">
                    <div
                        className="absolute top-5 right-6 text-black hover:scale-125 transition ease duration-300 hover:cursor-pointer"
                        onClick={() => setShowRoom(false)}
                    >
                        <IoIosClose size={35} />
                    </div>
                    <div
                        className={`p-6 bg-gradient-to-bl sm:max-w-xl sm:mx-auto sm:rounded-2xl ${
                            room.price < 50
                                ? "from-green-200 to-green-900"
                                : room.price >= 1000
                                ? "from-yellow-200 to-yellow-900"
                                : "from-blue-200 to-blue-900"
                        }`}
                    >
                        <img
                            src={`/storage/images/${room.image}`}
                            alt={room.name}
                            className="rounded-xl"
                        />
                        <div className="w-full flex flex-row">
                            <div className="flex flex-col justify-center items-start">
                                <h1 className="text-xl font-bold mt-2">
                                    {room.name}
                                </h1>
                                <p>{room.description}</p>
                                <p className="text-red">{room.price} $</p>
                            </div>
                            <div className="w-full flex flex-col justify-end items-end">
                                <div className="w-2/3">
                                    <Datepicker
                                        primaryColor="amber"
                                        placeholder="Choose Dates"
                                        onChange={handleDateChange}
                                        minDate={new Date()}
                                        disabledDates={reservedDates}
                                        filterDate={(date) =>
                                            !isDateReserved(date)
                                        }
                                    />
                                    {errors.start_date && (
                                        <p className="text-red-700 text-sm">
                                            {errors.start_date}
                                        </p>
                                    )}
                                    {errors.endDate && (
                                        <p className="text-red-700 text-sm">
                                            {errors.endDate}
                                        </p>
                                    )}
                                </div>
                                <input
                                    type="email"
                                    className="mt-2 p-2 text-gray-100 shadow-lg rounded-2xl border-2 border-gray-400 w-full focus:scale-110 transition ease duration-300 bg-slate-800 w-2/3"
                                    placeholder="Enter guest email (optional)"
                                    value={guestEmail}
                                    onChange={handleEmailChange}
                                />
                                {errors.email && (
                                    <p className="text-red-700 text-sm my-2">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="mt-4 w-full flex justify-end">
                            <PrimaryButton onClick={handleSubmit}>
                                Reserve
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default RoomModal;
