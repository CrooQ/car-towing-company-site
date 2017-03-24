<?php

define( 'ADMIN_EMAIL', '************' );
define( 'ADMIN_NAME', '***********' );

//Jaka metoda zaladowlismy plik mailSender.php
if( $_SERVER['REQUEST_METHOD'] === 'POST' ){

    //Zaladowanie biblioteki PHPMailer
    require_once 'PHPMailer/PHPMailerAutoload.php';

    //Walidacja pol formularza
    $name = isset( $_POST['name'] ) ? trim($_POST['name']) : '';    
    $surname = isset( $_POST['surname'] ) ? trim($_POST['surname']) : '';    
    $email = isset( $_POST['email'] ) ? trim($_POST['email']) : '';    
    $phone = isset( $_POST['phone'] ) ? trim($_POST['phone']) : '';    
    $subject = isset( $_POST['subject'] ) ? trim($_POST['subject']) : '';    
    $message = isset( $_POST['message'] ) ? trim($_POST['message']) : '';

    if( !empty($name) && !empty($surname) && !empty($email) && !empty($subject) && !empty($message) ){
        $subject = "Formularz ze strony SIGNALEN - $subject";
        $message = "Wiadomość od $name $surname ($email, $phone)<br>Treść wiadomości:<br> $message";
    }

    $mail = new PHPMailer;

    // Set up SMTP  
    $mail->IsSMTP();                // Sets up a SMTP connection  
    $mail->SMTPAuth = true;         // Connection with the SMTP does require authorization    
    $mail->SMTPSecure = "ssl";      // Connect using a TLS connection  
    $mail->Host = "************";  //Gmail SMTP server address
    $mail->Port = 465;  //Gmail SMTP port
//    $mail->Encoding = '7bit';

    // Authentication  
    $mail->Username   = "*************"; // Your full Gmail address
    $mail->Password   = "************"; // Your Gmail password

    $mail->setFrom( $email );
    $mail->addAddress( ADMIN_EMAIL, ADMIN_NAME );
    $mail->addReplyTo( $email, $name, $surname );
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = $message;
    $mail->CharSet = 'UTF-8';

    if(!$mail->send()){
        $msg = urlencode( 'Błąd w wysyłaniu wiadomości: ' . $mail->ErrorInfo );
        $mode = 'error';
    } else {
        $msg = urlencode( 'Wiadomość została wysłana' );
        $mode = 'success';
    }

    header( 'Location: kontakt.html?msg='. $msg . '&mode='. $mode );
}
