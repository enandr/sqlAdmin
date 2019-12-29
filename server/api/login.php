<?php

if ($request['method'] === 'POST') {
  $uname = $request['body']['userName'];
  $password = $request['body']['password'];
  $_SESSION['userName'] = $uname;
  $_SESSION['password'] = $password;

  $response['body'] = $uname;
  send($response);
}
