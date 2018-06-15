<?php

include "connection.php";


if(!empty ($_POST['name']))         $name=$_POST['name'];
if(!empty ($_POST['last_name']))    $last_name=$_POST['last_name'];
if(!empty ($_POST['email']))        $email=$_POST['email'];
if(!empty ($_POST['password1']))    $password1=$_POST['password1'];
if(!empty ($_POST['password2']))    $password2=$_POST['password2'];
$responce=array(
    'error'=> false,
    'errorMess' =>array(),
);
if(!empty ($_POST['email'])&&chekEmail($email)){
    $responce['error']=true;
    $responce['errorMess']['email']="Пользователь с таким Email адресом уже существует";
}

if(!$responce['error']){
    $connection->query("INSERT into users(name,last_name, email, password) values('$name','$last_name','$email','$password1')");
}



echo json_encode($responce);


function chekEmail($email){
    global $connection;
    $tmp=$connection->query("SELECT * from users where email='$email'");
    if($tmp->num_rows>0){
        return true;
    }
    return false;
}