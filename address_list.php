<?php

require"connect.php";
header('Access-Control-Allow-Origin: *');

 class Data
  {
    function Data($code,$msg,$data){
      $this -> code = $code;
      $this -> msg = $msg;
      $this -> data =$data;
    }
  }
  
     class addressList
  {
    function addressList($idAuto,$idAccount,$fullname,$phone,$address,$addresstype)
    {
      $this -> idAuto = $idAuto;
      $this -> idAccount = $idAccount;
      $this -> fullname = $fullname;
      $this -> phone = $phone;
      $this -> address = $address;
      $this -> addresstype = $addresstype;
    }
 }

   $idAccount = "";
if(isset($_POST['$idAccount'])) {
 $idAccount =$_POST['$idAccount'];
}

if($idAccount == ""){
 getResult(-2,"Vui lòng nhập đủ thông tin");
}else{
  getAddressList($con);
}

  function getAddressList($con){
    $query = "SELECT * FROM addressList where $idAccount =$idAccount";
    $data =  mysqli_query($con,$query);

  $arrayAddressList = array();
   
   if ($data) {

  while($row = mysqli_fetch_assoc($data)){
    array_push($arrayAddressList, new addressList($row['$idAuto'],$row['$idAccount'],$row['fullname'],$row['phone'],$row['address'],$row['addresstype']));
   }
   getResult(0,"Danh sách address",$arrayAddressList);
   }else{
   getResult(-1,"Lỗi server");
 }
}

   function getResult($code, $msg,$data =array())
 {
  $object = new Data($code,$msg,$data);
  echo json_encode($object);
 }

?>