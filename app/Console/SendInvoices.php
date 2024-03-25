<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\Pages\LicenseController;

class SendInvoices extends Command
{
    protected $signature = 'invoices:send';
    protected $description = 'Sende monatliche Rechnungen';

    public function handle()
    {
        $licenseController = new LicenseController();
        $licenseController->generateAndSendInvoice();
    }
}