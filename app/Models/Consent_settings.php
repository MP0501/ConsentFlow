<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Consent_settings extends Model
{
    use HasFactory;

    protected $table = "consent_settings";

    protected $fillable = ['value', 'key', 'consent_id'];

    public function consent():BelongsTo
    {
        return $this->belongsTo(Consent::class, "consent_id");
    }
}
