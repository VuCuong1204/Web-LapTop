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
  
 $username = "";
if(isset($_POST['username'])) {
 $username =$_POST['username'];
}

 $password = "";
if(isset($_POST['password'])) {
 $password =$_POST['password'];
}

if(($username) == ""|| ($password) == ""){
	getResult(-2,"Vui lòng nhập đủ thông tin");
}else{
	checkLogin($username,$password,$con);
}
  
  function checkLogin($username,$password,$con)
  {
  $query = "SELECT id FROM account WHERE username = '$username' AND password = '$password' ";
  $data = mysqli_query($con,$query);

  if($data){
  $row = mysqli_fetch_assoc($data);
  $id = $row['id'];
  if( is_null($id)){
   getResult(-1,"Thông tin tài khoản hoặc mật khẩu không chính xác");
   }else{
   getUserInfo($username,$password,$con);
    }
   }else{
     getResult(-4,"lỗi server");
   }
  }

 function getUserInfo($username,$password,$con)
 {

  $query = "SELECT  *FROM account WHERE username = '$username' AND password = '$password'";
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
  getResult(0,"Đăng nhập thành công",$arrayAccount);
 }

 function getResult($code, $msg, $data = array())
 {
  $object = new Data($code,$msg,$data);
  echo json_encode($object);
 }

?>
