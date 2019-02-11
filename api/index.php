<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

require_once('btcturk.php');
$new = new BTCTurk();

$content = curl_get("https://www.doviz.com/");

function curl_get($url, array $get = NULL, array $options = array()) {
    $defaults = array(
    CURLOPT_URL => $url. (strpos($url, '?') === FALSE ? '?' : ''). http_build_query($get),
    CURLOPT_HEADER => 0,
    CURLOPT_RETURNTRANSFER => TRUE,
    CURLOPT_TIMEOUT => 4
    );

    $ch = curl_init();
    curl_setopt_array($ch, ($options + $defaults));
    if( ! $result = curl_exec($ch))
    {
    trigger_error(curl_error($ch));
    }
    curl_close($ch);
    return $result;
}

function find($start, $end, $content){
    preg_match_all('/' . preg_quote($start, '/') . '(.*?)' . preg_quote($end, '/') . '/i', $content, $out);
    return $out[0];
}

$find = find('<span class="menu-row2">', '</span>', $content);
$find2 = find('<span class="menu-row3">', '</span>', $content);

$altin = strip_tags($find[0]);
$altin_d = str_replace("% ", "", strip_tags($find2[0]));
if (substr($altin_d, 0, 1) == "-") {
    $altin_d = false;
} else {
    $altin_d = true;
}
$dolar = strip_tags($find[1]);
$dolar_d = str_replace("% ", "", strip_tags($find2[1]));
if (substr($dolar_d, 0, 1) == "-") {
    $dolar_d = false;
} else {
    $dolar_d = true;
}
$euro = strip_tags($find[2]);
$euro_d = str_replace("% ", "", strip_tags($find2[2]));
if (substr($euro_d, 0, 1) == "-") {
    $euro_d = false;
} else {
    $euro_d = true;
}


$btcturk = $new->ticker ();

$btc_price = number_format($btcturk[0]["last"], 0, ',', '.');
if ($btcturk[0]["daily"] > 0) {
    $btc_daily = true;
} else {
    $btc_daily = false;
}
$eth_price = number_format($btcturk[1]["last"], 0, ',', '.');
if ($btcturk[1]["daily"] > 0) {
    $eth_daily = true;
} else {
    $eth_daily = false;
}
$xrp_price = number_format($btcturk[2]["last"], 2, ',', '.');
if ($btcturk[2]["daily"] > 0) {
    $xrp_daily = true;
} else {
    $xrp_daily = false;
}

$data = [
    'altin' => [
        'price' => $altin,
        'daily' => $altin_d
    ],
    'dolar' => [
        'price' => $dolar,
        'daily' => $dolar_d
    ],
    'euro' => [
        'price' => $euro,
        'daily' => $euro_d
    ],
    'btc' => [
        'price' => $btc_price,
        'daily' => $btc_daily
    ],
    'eth' => [
        'price' => $eth_price,
        'daily' => $eth_daily
    ],
    'xrp' => [
        'price' => $xrp_price,
        'daily' => $xrp_daily
    ]
];
echo json_encode($data);
?>