<?php

use Kilte\Silex\Captcha\CaptchaServiceProvider;
use Silex\Provider\SessionServiceProvider;
use Silex\Provider\UrlGeneratorServiceProvider;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


require_once __DIR__ . '/vendor/autoload.php';

$app = new Silex\Application();


$captcha = new CaptchaServiceProvider();
$app->register(new SessionServiceProvider)
    ->register(new UrlGeneratorServiceProvider)
    ->register($captcha)
    ->mount('/', $captcha);

$app->post(
    '/send', function (Request $request) use ($app) {
        $message = $request->get('textarea');
        $mail = $request->get('email');
        $captcha = $request->get('captcha_code');

        if (!$app['captcha.test']($captcha)) {
            return new Response('captcha', 200);
        }

        if (empty($mail) || empty($message)) {
            return new Response('This is bad!', 200);
        }
        $header = 'From: '.$mail.'' . "\r\n" .
            'Reply-To: robin.glauser@gmail.com' . "\r\n" .
            'X-Mailer: PHP/' . phpversion();

        mail('robin.glauser@gmail.com', 'Feedback from ' . $mail, $message,$header);

        return new Response('You\'re Awesome', 200);
    }
);


$app->run();