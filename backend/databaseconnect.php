<?php
try {
    $bdd = new PDO(
        "mysql:host=127.0.0.1;dbname=smartpark;charset=utf8",
        "root",
        ""
    );
    $bdd->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => "Erreur SQL : " . $e->getMessage()]);
    exit;
}