<?php

// 👉 Mets ici l'URL de l'API Open Data
$apiUrl = "https://data.orleans-metropole.fr/api/explore/v2.1/catalog/datasets/om-mobilite-parcs-stationnement/records?limit=20";
// Récupère les données
$response = file_get_contents($apiUrl);

// Vérifie si la requête a échoué
if ($response === false) {
    http_response_code(500);
    echo json_encode(["error" => "Impossible de récupérer les données"]);
    exit;
}

$data = json_decode($response);

// Préparer un tableau simplifié avec nom, lat, lon
$parkings = array_map(function($item) {
    return [
        "nom" => $item->nom,
        "nb_places" => $item->nb_places,
        "nb_places_libres" => $item->nb_places_disponibles,
        "lat" => $item->geo->lat,
        "lon" => $item->geo->lon
    ];
}, $data->results);

header('Content-Type: application/json');
echo json_encode($parkings);

?>