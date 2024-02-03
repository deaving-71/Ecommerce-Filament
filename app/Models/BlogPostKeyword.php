<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogPostKeyword extends Model
{
    use HasFactory;

    protected $fillable = ['keyword', 'slug', 'blog_post_id'];
}
