<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Consent extends Model
{
    use HasFactory;

    protected $table = "consent";

    protected $primaryKey = "id";

    protected $fillable = array("id", "website_url");

    public function user(): BelongsTo
    {
    return $this->belongsTo(User::class, "user_id", "id");
    }

    public function views(): HasMany{
        return $this->hasMany(Consent_view::class, "consent_id");
    }
    public function settings(): HasMany{
        return $this->hasMany(Consent_settings::class, "consent_id");
    }
    public function vendors(): HasMany{
        return $this->hasMany(Consent_vendors::class, "consent_id");
    }
}
