<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make("Total Customers", User::count())
                ->description("Increase in customers")
                ->descriptionIcon("heroicon-m-arrow-trending-up")
                ->color("success")
                ->chart(["7,8,9,10,11,12"]),
            Stat::make('Unique views', '192.1k'),
            Stat::make('Bounce rate', '21%'),
        ];
    }
}
