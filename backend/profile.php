<?php
error_reporting(0);
ini_set('display_errors', 0);

require "cors.php";
require "databaseconnect.php";

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$email = $data["email"] ?? '';

if (empty($email)) {
    echo json_encode([
        "success" => false,
        "message" => "Email requis"
    ]);
    exit;
}

try {
    // Récupère l'utilisateur
    $req = $bdd->prepare("SELECT * FROM utilisateur WHERE Email = ?");
    $req->execute([$email]);
    $user = $req->fetch();

    if ($user) {
        echo json_encode([
            "success" => true,
            "user" => [
                "Id_Utilisateur" => $user["Id_Utilisateur"],
                "Nom" => $user["Nom"],
                "Prénom" => $user["Prénom"],
                "Email" => $user["Email"],
                "Id_Rôle" => $user["Id_Rôle"]
            ]
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Utilisateur non trouvé"
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Erreur serveur"
    ]);
}