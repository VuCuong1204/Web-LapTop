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

 $password = "";
if(isset($_POST['password'])) {
 $password =$_POST['password'];
}


if($id == ""
|| $password == ""
){
  getResult(-2,"Vui lòng nhập đủ thông tin");
}else{
 changePasswordAccount($id,$password,$con);
}

  function changePasswordAccount($id,$password,$con){

  $query= "UPDATE account set password =$password where id =$id";
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
