<?php

use App\Http\Controllers\RoomController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Room;
use App\Models\Comments;
use App\Models\User;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'rooms' => Room::paginate(10),
        'comments' => Comments::all(),
        'users' => User::all(),
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/rooms-all', [RoomController::class, 'index'])->name('rooms.all');
    Route::get('/add-room', [RoomController::class, 'add'])->name('room.add');
    Route::post('/add-room', [RoomController::class, 'store'])->name('room.store');
    Route::delete('/rooms/{room_id}', [RoomController::class, 'destroy'])->name('room.destroy');

    Route::post('/reservations', [ReservationController::class, 'store']);
    Route::get('/reservations', [ReservationController::class, 'index'])->name('reservations');

    Route::post('/comments', [RoomController::class, 'storeComment']);
});


require __DIR__.'/auth.php';
