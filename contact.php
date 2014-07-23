<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__.'/vendor/autoload.php';

$app = new Silex\Application();
$app['debug'] = true;

$app->get('/send', function (Request $request) use ($app) {
        $message = $request->get('textarea');
        $mail = $request->get('email');
        mail('robin.glauser@gmail.com', 'Feedback from '.$mail, $message);

        return new Response('Thank you for your feedback!', 201);
});

$app->run();