<?php
if ($request['method'] === 'GET') {
  $link = get_db_link();
  $sql = "SELECT `COLLATION_NAME` FROM `information_schema`.`COLLATIONS`";
  $data = mysqli_query($link, $sql);
  $res = mysqli_fetch_all($data, MYSQLI_ASSOC);
  $response['body'] = $res;
  send($response);
}
