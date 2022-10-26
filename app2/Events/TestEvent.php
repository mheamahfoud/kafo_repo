<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TestEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user_id;
    public $message;


    public function __construct($user_id, $message)
    {
        $this->user_id = $user_id;
        $this->message = $message;
    }


    public function broadcastOn()
    {
     
        return ['notificationChannel_' . $this->user_id];
    }

    public function broadcastAs()
    {
        return 'TestEvent';
    }
}
