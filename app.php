<?php

use Symfony\Component\HttpFoundation\Request;

require_once __DIR__ . '/vendor/autoload.php';

$app = new Silex\Application();
$app['debug'] = true;


$app->get(
    '/stars', function (Request $request) use ($app) {
    $stars = file_get_contents('https://api.github.com/repos/0xAX/linux-insides');
});

$app->get(
    '/blogfeed', function (Request $request) use ($app) {

    $cacheTime = 3600;
    $cacheFile = __DIR__ . '/cache/rss.xml';
    $timeDifference = @(time() - filemtime($cacheFile));
    if (file_exists($cacheFile) && $timeDifference < $cacheTime) {
        $feedUrl = file_get_contents($cacheFile);
    } else {
        $feedUrl = file_get_contents('http://www.robinglauser.ch/blog/feed/');
        if ($f = @fopen($cacheFile, 'w')) {
            fwrite($f, $feedUrl, strlen($feedUrl));
            fclose($f);
        }
    }
    $xml = simplexml_load_string($feedUrl);
    $count = 0;
    $max = 4;
    $data = [];
    foreach ($xml->channel->item as $val) {
        if ($count < $max) {
            preg_match('/^.*?[\.!\?](?:\s|$)/', strip_tags((string) $val->description), $matches);
            $data[] = [
                'title'   => (string) $val->title,
                'link'    => (string) $val->link,
                'summary' => str_replace(chr(194) . chr(160), ' ', $matches[0])
            ];
        } else {
            break;
        }
        $count++;
    }
    return new \Symfony\Component\HttpFoundation\JsonResponse($data);
}
);

$app->run();
