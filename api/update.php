<?php
include "connection.php";

$response=array(
    'error'=> false,
    'errorMess' =>"",
);

if(!empty ($_POST['id']))           $id=$_POST['id'];
if(!empty ($_POST['name']))         $name=$_POST['name'];
if(!empty ($_POST['last_name']))    $last_name=$_POST['last_name'];
if(!empty ($_POST['email']))        $email=$_POST['email'];

if(!empty ($_POST['id'])) {
    $sql="UPDATE users SET  name='$name',
                            last_name='$last_name',
                            email='$email'
                            where id='$id' ";
    
    if($connection->query($sql)===true){
        $response['errorMes']="Данные успешно изменены";
    }
    else{
        $response['error']=true;
        $response['errorMess']="Ошибка при изменени бд:  ".$connection->error;
    }
}
else{
    $response['error']=true;
    $response['errorMess']="Ошибка при передаче  данных";
}
echo json_encode($response);