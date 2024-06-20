<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use App\Models\User;
use App\Models\Room;
use Inertia\Inertia;

class ReservationController extends Controller
{

    public function index (){
        if(auth()->user()->type == 'admin'){
        return Inertia::render('Reservations', [
            'reservations' => Reservation::paginate(6),
            'users' => User::all(),
            'rooms' => Room::all(),
        ]);}
        else if(auth()->user()->type == 'user') {
            return Inertia::render('Reservations', [
                'reservations' => Reservation::where('user_id', auth()->user()->id)->paginate(6),
                'users' => User::all(),
                'rooms' => Room::all(),
            ]);
        }
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'room_id' => 'required|exists:rooms,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'visited' => 'required|boolean',
            'email' => 'required|email'
        ]);

        Reservation::create([
            'user_id' => $validatedData['user_id'],
            'room_id' => $validatedData['room_id'],
            'start_date' => $validatedData['start_date'],
            'end_date' => $validatedData['end_date'],
            'visited' => $validatedData['visited'] ?? 0,
            'email' => $validatedData['email'],
        ]);

        return redirect()->back()->with('message' ,'Reservated successfully!');
    }
}

