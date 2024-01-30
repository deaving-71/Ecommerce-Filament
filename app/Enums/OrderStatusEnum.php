<?php

namespace App\Enums;

enum OrderTypeEnumValue: string
{
    case PENDING = 'pending';
    case PROCESSING = 'processing';
    case SHIPPED = 'shipped';
    case DELIVERED = 'delivered';
    case CANCELED = 'canceled';
    case DECLINED = 'declined';
}
