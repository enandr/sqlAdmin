<?php
if (isset($_SESSION['userName']) && isset($_SESSION['password'])){
  $db_params = [
    'user' => $_SESSION['userName'],
    'pass' => $_SESSION['password'],
    'host' => 'localhost'
  ];
}
else{
  $db_params = [
    'user' => 'root',
    'pass' => 'root',
    'host' => 'localhost'
  ];
}
