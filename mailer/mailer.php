<?php

require_once __DIR__.'/vendor/autoload.php';

$mail = new Nette\Mail\Message;
$mail->setFrom('John <john@example.com>')
    ->addTo('peter@example.com')
    ->addTo('jack@example.com')
    ->setSubject('Order Confirmation')
    ->setBody("Hello, Your order has been accepted.")
    ->addAttachment('email.txt')
;

$mailer = new Nette\Mail\SmtpMailer([
    'host' => 'localhost',
    'port' => 1025,
]);

$mailer->send($mail);