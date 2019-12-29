<?php
if ($request['method'] === 'GET') {
  $link = get_db_link();
  $sql = 'SHOW DATABASES';
  $data = mysqli_query($link, $sql);
  $res = mysqli_fetch_all($data, MYSQLI_ASSOC);
  $DbAndTables=[];
  foreach ($res as $key) {
    $db = $key['Database'];
    $newArray = [];
    $newArray['Database'] = $db;
    // $sql = "SHOW TABLES FROM $db";
    $sql  = 'SELECT table_name, table_rows FROM information_schema.tables WHERE table_schema = \'';
    $sql = $sql . $db;
    $sql = $sql . '\' ORDER BY table_name';
    $data = mysqli_query($link, $sql);
    $resTables = mysqli_fetch_all($data, MYSQLI_ASSOC);
    $newArray['Tables']=$resTables;

    array_push($DbAndTables, $newArray);
  }
  $response['body'] = $DbAndTables;
  send($response);
}
