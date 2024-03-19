<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class User_info extends Model
{
    use HasFactory;

    protected $table = "user_infos";

    protected $primaryKey = "id";

    protected $fillable = [
        'first_name',
        'last_name',
        'company_name',
        'address',
        'city',
        'country',
        'photo'
    ];

    public $timestamps=False;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "user_id", "id");
    }
}