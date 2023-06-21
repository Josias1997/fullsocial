<?php

namespace App\Http\Controllers;

use DB;
use Exception;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function findUsersByQuery($userId, $query, $page = 1)
    {
        try {
            $users = DB::table("users")
                ->where('id', '<>', $userId)
                ->where(function (Builder $queryBuilder) use ($query) {
                    $queryBuilder->where('first_name', 'like', "%$query%")
                        ->orWhere('last_name', 'like', "%$query%");
                })->offset(($page - 1) * 10)->limit($page * 10)->get();
            return response()->json(['users' => $users]);
        } catch (Exception $e) {
            return response()->json(['message' => 'An error occurred ' . $e->getMessage()], 500);
        }
    }
}
