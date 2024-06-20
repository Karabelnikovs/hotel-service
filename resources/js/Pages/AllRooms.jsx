import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import RoomCard from "@/Components/RoomCard";
import RoomModal from "@/Components/RoomModal";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";

const AllRooms = ({ auth, rooms: initialRooms, comments, users }) => {
    const [rooms, setRooms] = useState(initialRooms.data);
    const [showRoom, setShowRoom] = useState(false);
    const [checkedRoom, setCheckedRoom] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);

    useEffect(() => {
        setRooms(initialRooms.data);
    }, [initialRooms]);

    useEffect(() => {
        handleSearch();
    }, [searchQuery, minPrice, maxPrice]);

    const handleShowRoom = (room) => {
        setShowRoom(true);
        setCheckedRoom(room);
    };

    const handleRemoveRoom = (roomId) => {
        setRooms(rooms.filter((room) => room.id !== roomId));
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        let searchedRooms = initialRooms.data.filter(
            (room) =>
                room.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                room.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) &&
                room.price >= minPrice &&
                room.price <= maxPrice
        );
        setRooms(searchedRooms);
    };

    const resetFilters = () => {
        setRooms(initialRooms.data);
        setMinPrice(0);
        setMaxPrice(10000);
        setSearchQuery("");
    };

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="All Rooms" />

                <div className="p-12">
                    <div className="flex items-center justify-center mb-6 max-[570px]:flex-col gap-2">
                        <input
                            type="text"
                            placeholder="Search rooms"
                            className="shadow-lg border-2 border-gray-400 rounded-2xl focus:scale-110 transition ease duration-300 py-2 px-3 mr-6"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />

                        <PrimaryButton onClick={handleSearch}>
                            Search
                        </PrimaryButton>
                        <div className="flex flex-col px-6">
                            <div className="flex flex-col">
                                <label
                                    htmlFor="minPrice"
                                    className="text-sm text-gray-800"
                                >
                                    Min. Price: {minPrice} $
                                </label>
                                <input
                                    name="minPrice"
                                    type="range"
                                    min={0}
                                    max={10000}
                                    value={minPrice}
                                    onChange={(e) =>
                                        setMinPrice(parseInt(e.target.value))
                                    }
                                    className="mr-3 cursor-pointer active:scale-150 transition ease duration-300"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label
                                    htmlFor="maxPrice"
                                    className="text-sm text-gray-800"
                                >
                                    Max. Price: {maxPrice} $
                                </label>
                                <input
                                    name="maxPrice"
                                    type="range"
                                    min={0}
                                    max={10000}
                                    value={maxPrice}
                                    onChange={(e) =>
                                        setMaxPrice(parseInt(e.target.value))
                                    }
                                    className="mr-3 cursor-pointer active:scale-150 transition ease duration-300"
                                />
                            </div>
                        </div>
                        <button
                            className="ml-3 text-gray-600"
                            onClick={resetFilters}
                        >
                            Reset Filters
                        </button>
                    </div>

                    {rooms.length > 0 ? (
                        <div className="pb-14 grid sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-10 mt-6">
                            {rooms.map((room) => (
                                <div className="w-full" key={room.id}>
                                    {room.price >= minPrice &&
                                        room.price <= maxPrice && (
                                            <RoomCard
                                                room={room}
                                                handleShowRoom={handleShowRoom}
                                                comments={comments}
                                                users={users}
                                                auth={auth}
                                            />
                                        )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-lg text-gray-600 w-full flex justify-center mb-12">
                            No rooms available
                        </div>
                    )}
                    {showRoom && (
                        <RoomModal
                            setShowRoom={setShowRoom}
                            room={checkedRoom}
                            auth={auth.user}
                        />
                    )}
                    <Pagination reservations={initialRooms} className="mb-10" />
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default AllRooms;
