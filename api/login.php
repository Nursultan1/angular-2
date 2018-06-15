<?php
    session_start();
    include "connection.php";

    if(!empty ($_POST['email']))       $email=$_POST['email'];
    if(!empty ($_POST['password']))    $password=$_POST['password'];

    $response=array(
        'error'=> true,
        'errorMess' =>"Неправильный пароль или логин",
    );

    if(! empty($_POST['email']) && !empty ($_POST['password'])){

        $tmp=$connection->query("SELECT * from users where email='$email' and password='$password'");

        if($tmp->num_rows>0){
            $response['error']=false;
            $response['errorMess']="";

            $row=$tmp->fetch_assoc();
            $_SESSION['user_id']=$row['id'];
            $response['user']=$row['id'];

        }
    }

    echo json_encode($response);

    

