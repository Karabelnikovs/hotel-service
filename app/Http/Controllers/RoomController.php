<?php

namespace App\Http\Controllers;

use Illuminate\Database\Schema\IndexDefinition;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Room;
use App\Models\Comments;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class RoomController extends Controller
{
    public function index(){
        return Inertia::render('AllRooms',[
            'rooms' => Room::paginate(6),
            'comments'=> Comments::all(),
            'users' => User::all(),
        ]);
    }
    public function add(){
        return Inertia::render('AddRoom');
        
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'price' => 'required|max:10000|min:1|numeric',
            'description' => 'required|min:20',
            'name' => 'required|max:20',
        ]);

        $room = new Room;
        $room->name = $request->input('name');
        $room->price = $request->input('price');
        $room->reservated = false;
        $room->description = $request->input('description');

        $file = $request->file('image');
        $filePath = $file->storeAs('images', $file->getClientOriginalName(), 'public');
        $room->image = $file->getClientOriginalName();

        $room->save();
        return redirect()->back()->with('message', 'Room Added Successfully');
    }

    public function storeComment(Request $request)
    {
        $request->validate([
            'comment' => 'required',
        ]);
        Comments::create([
            'comment' => $request['comment'],
            'room_id' => $request['room_id'],
            'user_id' => auth()->user()->id
        ]);
        return redirect()->back()->with('message', 'Commented successfully!');
    }
    public function destroy($id){
        
        Reservation::where('room_id', $id)->delete();
        Comments::where('room_id', $id)->delete();
        Room::where('id', $id)->delete();


        return redirect()->back()->with('message', 'Room deleted successfully!');
    }

}
