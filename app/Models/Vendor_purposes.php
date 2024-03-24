<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vendor_purposes extends Model
{
    use HasFactory;

    public $timestamps = false;


    protected $table = "vendor_purposes";

    protected $fillable = ['is_legitimate', 'consent_vendor_id','purpose_id'];

    public function consentVendor():BelongsTo
    {
        return $this->belongsTo(Consent_vendors::class, "consent_vendor_id");
    }
}
