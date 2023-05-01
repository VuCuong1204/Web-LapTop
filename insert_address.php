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

  $idAccount = "";
if(isset($_POST['idAccount'])) {
 $idAccount =$_POST['idAccount'];
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

if($idAccount == ""
|| $fullname == ""
||$phone == ""
|| $address == ""
){
  getResult(-2,"Vui lòng nhập đủ thông tin");
}else{
 updateAddressList($idAccount,$fullname,$phone,$address,$con);
}

function insertaddressList($idAccount,$fullname,$phone,$address,$con)
{
  $queryinsert = "INSERT INTO addressList(idAccount,fullname,phone,address,addresstype) VALUES ('$idAccount','$fullname','$phone','$address',1)";
  $datainsert = mysqli_query($con,$queryinsert);
   if ($datainsert) {
      getAddressList($idAccount,$con);
  }else{
     getResult(-1,"Lỗi server2");
  }
}

function updateAddressList($idAccount,$fullname,$phone,$address,$con)
{
  $queryUpdate1 = "UPDATE addressList set addresstype = 0 where idAccount ='$idAccount'";
  $dataupdate1 = mysqli_query($con,$queryUpdate1);
     if ($dataupdate1) {
     insertaddressList($idAccount,$fullname,$phone,$address,$con);
  }else{
     getResult(-1,"Lỗi server1");
  }
}

 function getAddressList($idAccount,$con){
    $query = "SELECT * FROM addressList where idAccount =$idAccount";
    $data =  mysqli_query($con,$query);

  $arrayAddressList = array();
   
   if ($data) {

  while($row = mysqli_fetch_assoc($data)){
    array_push($arrayAddressList, new addressList($row['idAuto'],$row['idAccount'],$row['fullname'],$row['phone'],$row['address'],$row['addresstype']));
   }
   getResult(0,"Danh sách address",$arrayAddressList);
   }else{
   getResult(-1,"Lỗi server3");
 }
}

 function getResult($code, $msg, $data = array())
 {
  $object = new Data($code,$msg,$data);
  echo json_encode($object);
 }
?>