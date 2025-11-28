<?php
error_reporting(0);
ini_set('display_errors', 0);

require "cors.php";
require "databaseconnect.php";

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$id = $data["id"] ?? '';
$nom = $data["nom"] ?? '';
$prenom = $data["prenom"] ?? '';
$email = $data["email"] ?? '';

if (empty($id) || empty($nom) || empty($prenom) || empty($email)) {
    echo json_encode([
        "success" => false,
        "message" => "Tous les champs sont requis"
    ]);
    exit;
}

try {
    $req = $bdd->prepare("UPDATE utilisateur SET Nom = ?, Prénom = ?, Email = ? WHERE Id_Utilisateur = ?");
    $req->execute([$nom, $prenom, $email, $id]);

    echo json_encode([
        "success" => true,
        "message" => "Profil mis à jour avec succès"
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Erreur lors de la mise à jour"
    ]);
}