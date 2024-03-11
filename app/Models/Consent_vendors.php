<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Consent_vendors extends Model
{
    use HasFactory;

    protected $table = "consent_vendors";

    protected $fillable = ['name', 'script_to_implement', 'policy_url', 'consent_id'];

    public function consent(): BelongsTo
    {
        return $this->belongsTo(Consent::class, "consent_id");
    }

    public function features():hasMany
    {
        return $this->hasMany(Vendor_purposes::class, "consent_vendor_id");
    }

    public function purposes():HasMany
    {
        return $this->hasMany(Vendor_purposes::class, "consent_vendor_id");
    }
}
