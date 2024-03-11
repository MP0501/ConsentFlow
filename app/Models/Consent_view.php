<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Consent_view extends Model
{
    use HasFactory;

    protected $table = "consent_views";

    protected $fillable = ['accept_value', 'consent_id'];

    public function consent(): BelongsTo
    {
        return $this->belongsTo(Consent::class, "consent_id");
    }
}
