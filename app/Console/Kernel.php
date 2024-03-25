<?php

namespace App\Console;

use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    
    protected function schedule(Schedule $schedule): void
    {
        $schedule->command('invoices:send')->monthlyOn(1, '00:00');
    }



    /**
     * Register the commands for the application.
     */



    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');


        require base_path('routes/console.php');
    }
}
