<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require '../config.php';

$title = "Ai scroogerfrog order";
$c = true;

$login=MAIL_LOGIN;
$pass=MAIL_PASS;

foreach ($_POST as $key => $value) {
    if ($value != "") {
        $body .= "
            " . (($c = !$c) ? '<tr>' : '<tr style="background-color: #f8f8f8;">') . "
                <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
            </tr>
        ";
    }
}
$body = "<table style='width: 100%;'>$body</table>";

$mail = new PHPMailer();

$mail->isSMTP();

$mail->Host = 'smtp.gmail.com';

$mail->Port = 465;

$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;

	//Whether to use SMTP authentication
$mail->SMTPAuth = true;

	//Username to use for SMTP authentication - use full email address for gmail
$mail->Username = $login;

	//Password to use for SMTP authentication
$mail->Password = $pass;

	//Set who the message is to be sent from
	//Note that with gmail you can only use your account address (same as `Username`)
	//or predefined aliases that you have configured within your account.
	//Do not use user-submitted addresses in here
$mail->setFrom($login, '');

$mail->CharSet = 'UTF-8';

$mail->setFrom('Antifraud@scroogefrog.com', 'ScroogeFrog');
$mail->addAddress('Antifraud@scroogefrog.com');

$mail->addAddress('k@scroogefrog.com');

$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;

try {
    $mail->send();
} catch (Exception $e) {
    echo "Error: {$mail->ErrorInfo}";
}