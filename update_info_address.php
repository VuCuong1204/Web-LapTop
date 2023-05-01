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


$idAuto= "";
if(isset($_POST['idAuto'])) {
 $idAuto =$_POST['idAuto'];
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

if($fullname == ""
||$phone ==""
||$address ==""
||$idAuto == ""
){
 getResult(-2,"Vui lòng nhập đủ thông tin");
}else{
 updateAddressList($idAuto,$fullname,$phone,$address,$con);
}

function updateAddressList($idAuto,$fullname,$phone,$address,$con)
{
  $queryUpdate1 = "UPDATE addressList set fullname = '$fullname',phone = '$phone',address = '$address', where idAuto ='$idAuto'";
  $dataupdate1 = mysqli_query($con,$queryUpdate1);
     if ($dataupdate1) {
     getAddressList($idAuto,$con);
  }else{
     getResult(-1,"Lỗi server");
  }
}

 function getAddressList($idAuto,$con){
    $query = "SELECT * FROM addressList where idAuto =$idAuto ";
    $data =  mysqli_query($con,$query);

  $arrayAddressList = array();
   
   if ($data) {

  while($row = mysqli_fetch_assoc($data)){
    array_push($arrayAddressList, new addressList($row['idAuto'],$row['idAccount'],$row['fullname'],$row['phone'],$row['address'],$row['addresstype']));
   }
   getResult(0,"Danh sách address",$arrayAddressList);
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