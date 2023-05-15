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

  $productId = "";
if(isset($_POST['productId'])) {
 $productId =$_POST['productId'];
}

if($productId == ""){
  getResult(-2,"Vui lòng nhập đủ thông tin");
}else{
  getRateList($productId,$con);
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