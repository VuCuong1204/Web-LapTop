<?php

 require "connect.php";
header('Access-Control-Allow-Origin: *');

 class Data
  {
    function Data($code,$msg,$data){
      $this -> code = $code;
      $this -> msg = $msg;
      $this -> data =$data;
    }
  }
  
 $id = "";
if(isset($_POST['id'])) {
 $id =$_POST['id'];
}

 $fullname = "";
if(isset($_POST['fullname'])) {
 $fullname =$_POST['fullname'];
}

 $email = "";
if(isset($_POST['email'])) {
 $email =$_POST['email'];
}

 $phone = "";
if(isset($_POST['phone'])) {
 $phone =$_POST['phone'];
}

 $address = "";
if(isset($_POST['address'])) {
 $address =$_POST['address'];
}


if($id == ""
|| $fullname == ""
|| $email == ""
|| $phone == ""
){
  getResult(-2,"Vui lòng nhập đủ thông tin");
}else{
 editProfile($id,$fullname,$email,$phone,$address,$con);
}

  function editProfile($id,$fullname,$email,$phone,$address,$con){

  $query= "UPDATE account set fullname ='$fullname',email ='$email',phone ='$phone',address ='$address' where id ='$id'";
  $data = mysqli_query($con,$query);

  if ($data) {
      getUserInfo($id,$con);
  }else{
     getResult(-1,"Lỗi server vui lòng thực hiện lại");
  }
 }
 
  function getUserInfo($id,$con)
 {

  $query = "SELECT  *FROM account WHERE id = '$id'";
  $data = mysqli_query($con,$query);

  class Account
  {
    function Account($id,$username,$password,$position,$fullname,$email,$phone,$address)
    {
      $this -> id = $id;
      $this -> use_name = $username;
      $this -> password = $password;
      $this -> position = $position;
      $this -> full_name =$fullname;
      $this -> email = $email;
      $this -> phone =$phone;
      $this -> address = $address;
    }
  }

  $arrayAccount = array();
  while($row = mysqli_fetch_assoc($data)){
    array_push($arrayAccount, new Account($row['id'],$row['username'],$row['password'],$row['position'],$row['fullname'],$row['email'],$row['phone'],$row['address']));
  }
  getResult(0,"Đổi thông tin thành công",$arrayAccount);
 }
 
 function getResult($code, $msg, $data = array())
 {
  $object = new Data($code,$msg,$data);
  echo json_encode($object);
 }

?>
