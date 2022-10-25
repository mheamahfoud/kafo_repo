<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Kutia\Larafirebase\Messages\FirebaseMessage;

class SendPushNotification extends Notification
{
    use Queueable;

    protected $title;
    protected $message;
    protected $fcmTokens;
    protected $icon;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($title,$message,$icon,$fcmTokens)
    {
        $this->title = $title;
        $this->message = $message;
        $this->icon = $icon;
        $this->fcmTokens = $fcmTokens;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['firebase'];
    }

    public function toFirebase($notifiable)
    {
        return (new FirebaseMessage)
            ->withTitle($this->title)
            ->withBody($this->message)
            ->withImage(is_null($this->icon)? null : env('APP_URL').'/'. $this->icon)
            ->withPriority('high')->asNotification($this->fcmTokens);
    }
}
