<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function parent(): \Illuminate\Database\Eloquent\Relations\MorphTo
    {
        return $this->morphTo();
    }

    public function replies(): \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(self::class, 'parent');
    }

    public function images(): \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(Image::class, 'parent');
    }

    public function videos(): \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(Video::class, 'parent');
    }
    public function interactions(): \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(Interaction::class, 'parent');
    }

    public function notifications(): \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(Notification::class, 'related_to');
    }
}
