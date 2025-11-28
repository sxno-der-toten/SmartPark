<?php
error_reporting(0);
ini_set('display_errors', 0);

require "cors.php";
require "databaseconnect.php";

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$nom = $data["nom"] ?? '';
$prenom = $data["prenom"] ?? '';
$email = $data["email"] ?? '';
$password = $data["password"] ?? '';

if (empty($nom) || empty($prenom) || empty($email) || empty($password)) {
    echo json_encode([
        "success" => false,
        "message" => "Tous les champs sont requis"
    ]);
    exit;
}

try {
    // Vérifier si l'email existe déjà
    $check = $bdd->prepare("SELECT * FROM utilisateur WHERE Email = ?");
    $check->execute([$email]);

    if ($check->fetch()) {
        echo json_encode([
            "success" => false,
            "message" => "Cet email est déjà utilisé"
        ]);
        exit;
    }

    // Hasher le mot de passe
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insérer l'utilisateur - utilisez "Password" avec P majuscule
    $req = $bdd->prepare("INSERT INTO utilisateur (Nom, Prénom, Email, Password, Id_Rôle) VALUES (?, ?, ?, ?, 2)");
    $req->execute([$nom, $prenom, $email, $hashedPassword]);

    $userId = $bdd->lastInsertId();

    echo json_encode([
        "success" => true,
        "user" => [
            "Id_Utilisateur" => $userId,
            "Nom" => $nom,
            "Prénom" => $prenom,
            "Email" => $email,
            "Id_Rôle" => 2
        ]
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Erreur lors de l'inscription: " . $e->getMessage()
    ]);
}