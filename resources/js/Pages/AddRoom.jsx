import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

const AddRoom = ({ auth }) => {
    const { data, setData, post, reset, errors } = useForm({
        name: "",
        description: "",
        price: "",
        image: null,
    });

    const handleFileChange = (e) => {
        setData("image", e.target.files[0]);
    };

    const saveRoom = (e) => {
        e.preventDefault();
        post("/add-room", {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Add Room" />

                <div className="mt-10 w-full flex items-center justify-center">
                    <form
                        onSubmit={saveRoom}
                        method="POST"
                        encType="multipart/form-data"
                        className="w-86 p-10 bg-black/15 rounded-3xl shadow-2xl"
                    >
                        <div className="mb-3 flex flex-col items-center justify-center">
                            <input
                                type="text"
                                name="name"
                                className="shadow-lg border-2 border-gray-400 rounded-2xl w-full focus:scale-110 transition ease duration-300"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder="Name"
                                value={data.name}
                            />
                        </div>
                        {errors.name && (
                            <p className="text-red-700 text-sm my-2">
                                {errors.name}
                            </p>
                        )}

                        <div className="mb-3 flex flex-col items-center justify-center">
                            <textarea
                                name="description"
                                className="shadow-lg border-2 border-gray-400 rounded-2xl resize-none h-32 w-full focus:scale-110 transition ease duration-300"
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                placeholder="Description"
                                value={data.description}
                            />
                        </div>
                        {errors.description && (
                            <p className="text-red-700 text-sm my-2">
                                {errors.description}
                            </p>
                        )}

                        <div className="mb-3 flex flex-col items-center justify-center">
                            <input
                                type="number"
                                name="price"
                                className="shadow-lg rounded-2xl border-2 border-gray-400 w-full focus:scale-110 transition ease duration-300"
                                onChange={(e) =>
                                    setData("price", e.target.value)
                                }
                                placeholder="Price"
                                value={data.price}
                                step="0.1"
                                min="1"
                                max="10000"
                            />
                        </div>
                        {errors.price && (
                            <p className="text-red-700 text-sm my-2">
                                {errors.price}
                            </p>
                        )}

                        <div className="mb-3 flex flex-col items-center justify-center">
                            <input
                                type="file"
                                name="image"
                                className="shadow-lg rounded-3xl border-2 border-gray-400 py-10 px-5 bg-black/10 hover:bg-black/20 from-yellow-700/50 to-gray-200 my-5 w-full hover:scale-110 transition ease duration-300"
                                onChange={handleFileChange}
                            />
                        </div>
                        {errors.image && (
                            <p className="text-red-700 text-sm my-2">
                                {errors.image}
                            </p>
                        )}

                        <div className="mb-3 flex flex-col items-center justify-center">
                            <PrimaryButton>Save</PrimaryButton>
                        </div>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default AddRoom;
