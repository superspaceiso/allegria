<?php

$date = $_POST['date'];
$time = $_POST['time'];
$party_size = $_POST['party'];
$name = $_POST['name'];
$phone_no = $_POST['tel'];
$email = $_POST['email'];
$message_content = $_POST['message'];


class MailScript
{
  private $date;
  private $time;
  private $party_size;
  private $name;
  private $phone_no;
  private $email;
  private $message_content;

  private $forward_email = 'scott@scottcottam.co.uk';
  private $subject = 'Reservation Request';

  public function __construct($date, $time, $party_size, $name, $phone_no, $email, $message_content = NULL)
  {
    $covert_date = new DateTime($date);
    $this->date = $covert_date->format('d/m/Y');
    $this->time = $time;
    $this->party_size = $party_size;
    $this->name = $name;
    $this->phone_no = $phone_no;
    $this->email = $email;
    $this->message_content = $message_content;
  }

  public function createHeaders()
  {
    if (version_compare(PHP_VERSION, '7.2.0') >= 0) {
      $headers = [
        'From' => $this->forward_email
      ];
      return $headers;
    } else {
      return 'From: ' . $this->forward_email;
    }
  }

  public function createMessage()
  {
    $email_message = "
        You have received a new reservation request from your website.
        Name: $this->name
        Phone Number: $this->phone_no
        Email: $this->email

        Reservation Date: $this->date
        Reservation Time: $this->time
        Party Size: $this->party_size

        Message:
        $this->message_content

        ";
    return $email_message;
  }

  public function __destruct()
  {
    $mail = mail($this->forward_email, $this->subject, $this->createMessage(), $this->createHeaders());

    if(!$mail)
    {
      http_response_code(500);
    }

  }
}

$mail = new MailScript($date, $time, $party_size, $name, $phone_no, $email, $message_content);
