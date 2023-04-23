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
||$phone = ""
|| $address = ""
){
  getResult(-2,"Vui lòng nhập đủ thông tin");
}else{
 insertaddressList($id,$fullname,$phone,$address,$con);
}

function insertaddressList($id,$fullname,$phone,$address,$con)
{
  $queryinsert = "INSERT INTO account VALUES ('$id','$fullname','$phone','$address',0)";
  $datainsert = mysqli_query($con,$queryinsert);
   if ($datainsert) {
      getResult(0,"Thêm địa chỉ thành công");
  }else{
     getResult(-1,"Lỗi server");
  }
}

 function getResult($code, $msg, $data = array())
 {
  $object = new Data($code,$msg,$data);
  echo json_encode($object);
 }
?>