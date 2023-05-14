<?php 

require_once('database.php');

$search_criteria = $_POST['search_criteria'];

$query = "SELECT id, firt_name, last_name, emails, birthdate FROM authors WHERE firt_name LIKE '%" .$search_criteria."%' OR last_name LIKE '%" .$search_criteria."%'";

$authors = [];
$errors = ['data' => false];


$getAuthors = $db->query($query);

if($getAuthors -> num_rows > 0){
    while($data = $getAuthors-> fetch_assoc()){
        $authors[] = $data;
    }

    echo json_encode($authors);
}else{
    echo json_encode($errors);
}
?>