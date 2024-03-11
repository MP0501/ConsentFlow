<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vendor_features extends Model
{
    use HasFactory;

    protected $table = "vendor_features";

    protected $fillable = ['vendor_feature', 'consent_vendor_id'];

    public function consentVendor():BelongsTo
    {
        return $this->belongsTo(Consent_vendors::class, "consent_vendor_id");
    }
}
