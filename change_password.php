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

 $password_old = "";
if(isset($_POST['password_old'])) {
 $password_old =$_POST['password_old'];
}

 $password_new = "";
if(isset($_POST['password_new'])) {
 $password_new =$_POST['password_new'];
}


if($id == ""
|| $password_old == ""
|| $password_new == ""
){
  getResult(-2,"Vui lòng nhập đủ thông tin");
}else{
   $query = "SELECT id FROM account WHERE password = '$password_old' AND id = '$id' ";
   $data= mysqli_query($con,$query);
  
    if($data){
     $row = mysqli_fetch_assoc($data);
     $id = $row['id'];
     if( is_null($id)){
      getResult(-4,"Mật khẩu cũ không chính xác");
   }else{
      changePasswordAccount($id,$password_new,$con);
   }
 }
}

  function changePasswordAccount($id,$password_new,$con){

  $query= "UPDATE account set password ='$password_new' where id ='$id'";
  $data = mysqli_query($con,$query);

  if ($data) {
      getResult(0,"Đổi mật khẩu thành công");
  }else{
     getResult(-1,"Lỗi server vui lòng thực hiện lại");
  }
 }
 
 function getResult($code, $msg, $data = array())
 {
  $object = new Data($code,$msg,$data);
  echo json_encode($object);
 }

?>
