<?php

$server =  "localhost";
$username = "root";
$password = "";
$database = "live_search_2022";

$db = new mysqli($server, $username, $password, $database);


if ($db->connect_error) {
    die("Error ao se conectar com a base de dados" . $db->connect_error);
}
