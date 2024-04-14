<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve team information
    $teamName = $_POST["teamName"];
    $teamSize = $_POST["teamSize"];
    $teamLeaderName = $_POST["teamLeaderName"];
    $teamLeaderRegNo = $_POST["teamLeaderRegNo"];
    $teamLeaderEmail = $_POST["teamLeaderEmail"];
    $teamLeaderPhone = $_POST["teamLeaderPhone"];

    // Retrieve member information based on Team Size
    $membersInfo = [];
    for ($i = 1; $i <= $teamSize; $i++) {
        $memberName = $_POST["memberName$i"];
        $memberRegNo = $_POST["memberRegNo$i"];
        $memberEmail = $_POST["memberEmail$i"];
        $memberPhone = $_POST["memberPhone$i"];

        // Check if member information is filled before adding to the array
        if (!empty($memberName) && !empty($memberRegNo) && !empty($memberEmail) && !empty($memberPhone)) {
            // Store member information in an array
            $membersInfo[] = [
                "Name" => $memberName,
                "RegistrationNumber" => $memberRegNo,
                "Email" => $memberEmail,
                "Phone" => $memberPhone,
            ];
        }
    }

    // Perform any additional validation if needed

    // Upload payment confirmation image
    $targetDir = "uploads/";
    $paymentConfirmation = $_FILES["paymentConfirmation"];
    $paymentConfirmationPath = $targetDir . basename($paymentConfirmation["name"]);

    if (move_uploaded_file($paymentConfirmation["tmp_name"], $paymentConfirmationPath)) {
        // Image uploaded successfully

        // Send an email (this is a basic example, adjust based on your requirements)
        $to = "pratimesh2004@gmail.com"; // Replace with your email address
        $subject = "New Contact Form Submission from $teamLeaderName";
        $headers = "From: $teamLeaderEmail\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: multipart/mixed; boundary=\"boundary\"\r\n";

        // Email content (customize as needed)
        $message = "--boundary\r\n";
        $message .= "Content-Type: text/plain; charset=\"utf-8\"\r\n";
        $message .= "\r\n";
        $message .= "Team Name: $teamName\n";
        $message .= "Team Leader: $teamLeaderName\n";
        $message .= "Team Leader Registration Number: $teamLeaderRegNo\n";
        $message .= "Team Leader Email: $teamLeaderEmail\n";
        $message .= "Team Leader Phone: $teamLeaderPhone\n\n";

        if (!empty($membersInfo)) {
            $message .= "Members Information:\n";
            foreach ($membersInfo as $member) {
                $message .= "Name: {$member['Name']}\n";
                $message .= "Registration Number: {$member['RegistrationNumber']}\n";
                $message .= "Email: {$member['Email']}\n";
                $message .= "Phone: {$member['Phone']}\n\n";
            }
        }

        $message .= "--boundary\r\n";
        $message .= "Content-Type: application/octet-stream; name=\"paymentConfirmation.jpg\"\r\n";
        $message .= "Content-Transfer-Encoding: base64\r\n";
        $message .= "Content-Disposition: attachment\r\n";
        $message .= "\r\n";
        $message .= chunk_split(base64_encode(file_get_contents($paymentConfirmationPath))) . "\r\n";

        $message .= "--boundary--";

        // Use mail() function (you might want to consider a more robust email library)
        mail($to, $subject, $message, $headers);

        // You can also save the form data to a database if needed

        // Send a response to Ajax
        echo json_encode(["status" => "success", "message" => "Form submitted successfully"]);
    } else {
        // Failed to upload image
        echo json_encode(["status" => "error", "message" => "Failed to upload payment confirmation image"]);
    }
} else {
    // Invalid request method
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
