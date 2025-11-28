<?php
error_reporting(0);
ini_set('display_errors', 0);

require "cors.php";
require "databaseconnect.php";

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$email = $data["email"] ?? '';
$password = $data["password"] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode([
        "success" => false,
        "message" => "Email et mot de passe requis"
    ]);
    exit;
}

try {
    $req = $bdd->prepare("SELECT * FROM utilisateur WHERE Email = ?");
    $req->execute([$email]);
    $user = $req->fetch();

    if (!$user) {
        echo json_encode([
            "success" => false,
            "message" => "Email ou mot de passe incorrect"
        ]);
        exit;
    }

    // Utilisez "Password" avec un P majuscule
    if (password_verify($password, $user["Password"])) {
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
            "message" => "Email ou mot de passe incorrect"
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Erreur serveur"
    ]);
}