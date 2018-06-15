<?php

    session_start();
    include "connection.php";

    if(!empty ($_GET['id']))       $id=$_GET['id'];
    $response=array(
        'error'=> true,
        'errorMess' =>"",
    );

    if(!empty($_GET['id'])) {
        $tmp=$connection->query("SELECT * from users where id='$id'");
        if($tmp->num_rows>0){
            $response['error']=false;
            $response['sess']=$_SESSION;

            $row=$tmp->fetch_assoc();

            $response['user']['name']=$row['name'];
            $response['user']['last_name']=$row['last_name'];
            $response['user']['email']=$row['email'];
            $response['user']['id']=$row['id'];
        }
        else{
            $response['errorMess']="Ошибка";
            $response['id']=$id;
        }
    }   
    echo json_encode($response);