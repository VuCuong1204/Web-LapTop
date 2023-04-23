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
  
  	 class productType
  {
    function productType($productTypeId,$manufacturer,$productTypeImage)
    {
      $this -> productTypeId = $productTypeId;
      $this -> manufacturer = $manufacturer;
      $this -> productTypeImage = $productTypeImage;
    }
 }

  getProductTypeList($con);

  function getProductTypeList($con){
  	$query = "SELECT * FROM productType";
  	$data =  mysqli_query($con,$query);

  $arrayProductType = array();
   
   if ($data) {

  while($row = mysqli_fetch_assoc($data)){
    array_push($arrayProductType, new productType($row['productTypeId'],$row['manufacturer'],$row['productTypeImage']));
   }
   getResult(0,"Danh sách productType",$arrayProductType);
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