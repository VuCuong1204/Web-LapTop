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
  
     class product
  {
    function product(
      $productId,
      $productTypeId,
      $productName,
      $productCPU,
      $productCard,
      $productScreen,
      $productResolution,
      $productTouch,
      $productMaterial,
      $productWeight,
      $productWebcam,
      $productSystem,
      $productSpecial,
      $productAccess
      )
    {
      $this -> productId = $productId;
      $this -> productTypeId = $productTypeId;
      $this -> productName = $productName;
      $this -> productCPU = $productCPU;
      $this -> productCard = $productCard;
      $this -> productScreen = $productScreen;
      $this -> productResolution = $productResolution;
      $this -> productTouch = $productTouch;
      $this -> productMaterial = $productMaterial;
      $this -> productWeight = $productWeight;
      $this -> productWebcam = $productWebcam;
      $this -> productSystem = $productSystem;
      $this -> productSpecial = $productSpecial;
      $this -> productAccess = $productAccess;
    }
 }

  getProductTypeList($con);

  function getProductTypeList($con){
    $query = "SELECT * FROM product";
    $data =  mysqli_query($con,$query);

  $arrayProduct = array();
   
   if ($data) {

  while($row = mysqli_fetch_assoc($data)){
    array_push($arrayProduct,
     new product(
      $row['productId'],
      $row['productTypeId'],
      $row['productName'],
      $row['productCPU'],
      $row['productCard'],
      $row['productScreen'],
      $row['productResolution'],
      $row['productTouch'],
      $row['productMaterial'],
      $row['productWeight'],
      $row['productWebcam'],
      $row['productSystem'],
      $row['productSpecial'],
      $row['productAccess']
    ));
   }
   getResult(0,"Danh sách product",$arrayProduct);
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