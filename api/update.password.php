<?php

include "connection.php";

$response=array(
    'error'=> false,
    'errorMess' =>array(),
);

if(!empty ($_POST['id']))           $id=$_POST['id'];
if(!empty ($_POST['password']))     $password2=$_POST['password'];
if(!empty ($_POST['password1']))    $password1=$_POST['password1'];
if(!empty ($_POST['password2']))    $password2=$_POST['password2'];


if(!empty($_POST['id'])) {
    $sql="UPDATE users SET  password='$password1'  where id='$id' ";
    
    if($connection->query($sql)===true){
        $response['errorMess']="Данные успешно изменены";
    }
    else{
        $response['error']=true;
        $response['errorMess']="Ошибка при изменени бд:  ".$connection->error;
    }
}
else{
    $response['error']=true;
    $response['errorMess']="Данные не пришли";
}
echo json_encode($response);