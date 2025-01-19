<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'status',
        'last_login_at',
        'avatar',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $visible = [
        'id',
        'name',
        'email',
        'role',
        'status',
        'is_admin',
        'avatar',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'last_login_at' => 'datetime',
        'password' => 'hashed',
        'role' => 'string',
        'status' => 'string',
        'is_admin' => 'boolean',
    ];

    protected $attributes = [
        'role' => 'user',
        'status' => 'active',
    ];

    protected $appends = [
        'is_admin'
    ];

    // Role Helpers
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isUser(): bool
    {
        return $this->role === 'user';
    }

    // Status Helpers
    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    public function isBanned(): bool
    {
        return $this->status === 'banned';
    }

    public function isInactive(): bool
    {
        return $this->status === 'inactive';
    }

    // Accessors
    public function getIsAdminAttribute(): bool
    {
        return $this->isAdmin();
    }
}
