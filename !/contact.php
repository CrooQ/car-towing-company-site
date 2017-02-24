<?php


$from = 'Wiadomość od <contact@signalen.com>';
$sendTo = 'Wyślij do <contact@signalen.com>';
$subject = 'Nowa wiadomość ze strony SIGNALEN';
$fields = array('name' => 'Name', 'surname' => 'Surname', 'phone' => 'Phone', 'email' => 'Email', 'subject' => 'Subject', 'message' => 'Message'); // array variable name => Text to appear in the email
$okMessage = 'Formularz kontaktowy wysłany pomyślnie. Dziękujemy, odpowiemy w jak najkrótszym terminie.';
$errorMessage = 'Wysąpił błąd. Prosimy spróbować później';

// let's do the sending

try
{
    $emailText = "Masz nową wiadomość od\n=============================\n";

    foreach ($_POST as $key => $value) {

        if (isset($fields[$key])) {
            $emailText .= "$fields[$key]: $value\n";
        }
    }

    $headers = array('Content-Type: text/html; charset="UTF-8";',
                     'From: ' . $from,
                     'Reply-To: ' . $from,
                     'Return-Path: ' . $from,
                    );

    mail($sendTo, $subject, $emailText, implode("\n", $headers));

    $responseArray = array('type' => 'success', 'message' => $okMessage);
}
catch (\Exception $e)
{
    $responseArray = array('type' => 'danger', 'message' => $errorMessage);
}

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $encoded = json_encode($responseArray);

    header('Content-Type: application/json');

    echo $encoded;
}
else {
    echo $responseArray['message'];
}

?>