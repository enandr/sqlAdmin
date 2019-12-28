<?php
if ($request['method'] === 'GET') {
  $link = get_db_link();
  $sql = 'SHOW DATABASES';
  $data = mysqli_query($link, $sql);
  $res = mysqli_fetch_all($data, MYSQLI_ASSOC);
  $response['body'] = $res;
  send($response);
}
