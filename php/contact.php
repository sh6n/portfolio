<?php
/* ===========================================================
   YOUSSEF EL FARISSI · PORTFOLIO
   Traitement du formulaire de contact
   =========================================================== */

header('Content-Type: application/json; charset=utf-8');

// === Configuration ===
$destinataire = 'yyouss.elff@gmail.com';
$expediteur_systeme = 'no-reply@youssef-elfarissi.fr'; // À adapter selon votre hébergeur

// === Sécurité : méthode autorisée ===
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Méthode non autorisée']);
    exit;
}

// === Récupération + nettoyage ===
$name    = trim(filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS));
$email   = trim(filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL));
$subject = trim(filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_SPECIAL_CHARS));
$message = trim(filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS));

// === Validation ===
$errors = [];

if (empty($name) || strlen($name) > 100) {
    $errors[] = 'Nom invalide';
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Email invalide';
}
if (empty($subject) || strlen($subject) > 200) {
    $errors[] = 'Sujet invalide';
}
if (empty($message) || strlen($message) > 5000) {
    $errors[] = 'Message invalide';
}

// === Honeypot anti-spam (optionnel mais conseillé) ===
if (!empty($_POST['website'])) {
    // Bot détecté : on simule un succès silencieusement
    echo json_encode(['success' => true]);
    exit;
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => implode(', ', $errors)]);
    exit;
}

// === Préparation du mail ===
$sujet_mail = '[Portfolio] ' . $subject;

$corps_mail = "Nouveau message reçu via le portfolio\n";
$corps_mail .= "===========================================\n\n";
$corps_mail .= "Nom    : $name\n";
$corps_mail .= "Email  : $email\n";
$corps_mail .= "Sujet  : $subject\n\n";
$corps_mail .= "Message :\n";
$corps_mail .= "-------------------------------------------\n";
$corps_mail .= $message . "\n";
$corps_mail .= "-------------------------------------------\n\n";
$corps_mail .= "IP    : " . ($_SERVER['REMOTE_ADDR'] ?? 'inconnue') . "\n";
$corps_mail .= "Date  : " . date('d/m/Y H:i:s') . "\n";

$entetes  = "From: Portfolio Youssef <$expediteur_systeme>\r\n";
$entetes .= "Reply-To: $name <$email>\r\n";
$entetes .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$entetes .= "Content-Type: text/plain; charset=UTF-8\r\n";

// === Envoi ===
$envoye = @mail($destinataire, $sujet_mail, $corps_mail, $entetes);

if ($envoye) {
    echo json_encode(['success' => true, 'message' => 'Message envoyé avec succès']);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => "Le serveur n'a pas pu envoyer le mail. Contactez-moi directement à $destinataire"
    ]);
}
