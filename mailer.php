<?php

//Superglobals receive the form data via the POST method, these globals are assigned to variables that are sent to the mail script by the class constructor.

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

  //Forwards email to the intended receiver, my own email for test purposes.
  private $forward_email = 'scott@scottcottam.co.uk';
  //Email subject
  private $subject = 'Reservation Request';

  //
  public function __construct($date, $time, $party_size, $name, $phone_no, $email, $message_content = NULL)
  {
    //Every input variable is sanitized to prevent malicious data from being sent via the form, in particular strips out any HTML sent via the form.
    //Converts the date sent by the form to the UK date format
    $convert_date = new DateTime(filter_var($date, FILTER_SANITIZE_STRING));
    $this->date = $convert_date->format('d/m/Y');
    $this->time = filter_var($time, FILTER_SANITIZE_STRING);
    $this->party_size = filter_var($party_size, FILTER_SANITIZE_NUMBER_INT);
    $this->name = filter_var($name, FILTER_SANITIZE_STRING);
    $this->phone_no = filter_var($phone_no, FILTER_SANITIZE_NUMBER_INT);
    $this->email =  filter_var($email, FILTER_SANITIZE_EMAIL);
    $this->message_content = filter_var($message_content, FILTER_SANITIZE_STRING);
  }

  public function createHeaders()
  {
    //Checks PHP version on the server and creates compatible email headers accordingly
    if (version_compare(PHP_VERSION, '7.2.0') >= 0) {
      return [
        'From' => $this->forward_email
      ];
    } else {
      return 'From: ' . $this->forward_email;
    }
  }

  //Creates and formats the email message, this is a simple text email message without HTML
  public function createMessage()
  {
    return "
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
  }

  //On the destruction of the class the email message gets sent.
  public function __destruct()
  {
    $mail = mail($this->forward_email, $this->subject, $this->createMessage(), $this->createHeaders());

    //If the mail script fails to send a response code is sent back to the JS form handler to display an error message on the reservation form.
    if(!$mail)
    {
      http_response_code(500);
    }

  }
}


//This creates the an instance of mail script class, taking the superglobals and executing the scripts inside the class.
$mail = new MailScript($date, $time, $party_size, $name, $phone_no, $email, $message_content);
