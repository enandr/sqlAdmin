<?php
if ($request['method'] === 'GET') {
  $link = get_db_link();
  $dbSelected = $_GET['db'];
  $sql = "SELECT COUNT(*) FROM wickedSales.cartItems";
  $data = mysqli_query($link, $sql);
  $res = mysqli_fetch_all($data, MYSQLI_ASSOC);
  $response['body'] = $res[0]['COUNT(*)'];
  send($response);
}
