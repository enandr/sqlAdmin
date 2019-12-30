<?php
if ($request['method'] === 'GET') {
  $link = get_db_link();
  $dbSelected = $_GET['db'];
  $tableSelected = $_GET['table'];
  $sql = "SELECT * FROM $dbSelected.$tableSelected";
  $data = mysqli_query($link, $sql);
  $res = mysqli_fetch_all($data, MYSQLI_ASSOC);
  $response['body'] = $res;
  send($response);
}
