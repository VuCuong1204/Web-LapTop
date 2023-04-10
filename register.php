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

   $fullname = "";
   $email = "";
   $phone = "";
   $address = "";

  $query = "SELECT * FROM account ORDER BY id DESC Limit 1";
  $data = mysqli_query($con,$query);
  $row = mysqli_fetch_assoc($data);
  $id = $row['id'];
  $id = $id +1;
  $username_new= $row['username'];


if($username == ""
|| $password == ""
){
  getResult(-2,"Vui lòng nhập đủ thông tin");
}else{
 insertAccount($id,$username,$password,$fullname,$email,$phone,$address,$username_new,$con);
}

  function insertAccount($id,$username,$password,$fullname,$email,$phone,$address,$username_new,$con){
  if($username == $username_new){
     getResult(-3,"username đã tồn tại vui lòng đổi tên khác");
  }else{
  $queryinsert = "INSERT INTO account VALUES ('$id','$username','$password','0','$fullname','$email','$phone','$address')";
  $datainsert = mysqli_query($con,$queryinsert);

  if ($datainsert) {
      getUserInfo($id,$con);
  }else{
     getResult(-1,"đăng kí không thành công vui lòng thực hiện lại");
  }
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
  getResult(0,"Đăng kí thành công",$arrayAccount);
 }


 function getResult($code, $msg, $data = array())
 {
  $object = new Data($code,$msg,$data);
  echo json_encode($object);
 }

?>
