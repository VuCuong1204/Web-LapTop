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

      class rate
  {
  function rate($idRate,$productId,$accountId,$message,$username)
    {
      $this -> idRate = $idRate;
      $this -> productId = $productId;
      $this -> accountId = $accountId;
      $this -> message = $message;
      $this -> username = $username;
    }
 }

  $idRate = "";
if(isset($_POST['idRate'])) {
 $idRate =$_POST['idRate'];
}

  $productId = "";
if(isset($_POST['productId'])) {
 $productId =$_POST['productId'];
}

$message = "";
if(isset($_POST['message'])) {
 $message =$_POST['message'];
}

if($idRate == ""
||$productId ==""
||$message == ""
){
  getResult(-2,"Vui lòng nhập đủ thông tin");
}else{
 updateRateList($idRate,$productId,$message,$con);
}

function updateRateList($idRate,$productId,$message,$con)
{
  $queryUpdate = "UPDATE rate set message ='$message'where idRate ='$idRate'";
  $dataUpdate = mysqli_query($con,$queryUpdate);
   if ($dataUpdate) {
      getRateList($productId,$con);
  }else{
     getResult(-1,"Lỗi server");
  }
}

 function getRateList($productId,$con){
    $query = "SELECT * FROM rate where productId ='$productId' order by idRate DESC";
    $data =  mysqli_query($con,$query);

  $arrayRateList = array();
   
   if ($data) {

  while($row = mysqli_fetch_assoc($data)){
    array_push($arrayRateList, new rate($row['idRate'],$row['productId'],$row['accountId'],$row['message'],$row['username']));
   }
   getResult(0,"Danh sách rate",$arrayRateList);
   }else{
   getResult(-1,"Lỗi server 1");
 }
}

 function getResult($code, $msg, $data = array())
 {
  $object = new Data($code,$msg,$data);
  echo json_encode($object);
 }
?>