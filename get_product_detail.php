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
  

  $productId= "";
if(isset($_POST['productId'])) {
 $productId =$_POST['productId'];
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
      $productAccess,
      $productImage,
      $productPrice
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
      $this -> productImage = $productImage;
    }
 }

  class productDetail
  {
    function productDetail(
      $productId,
      $productColorId,
      $productRam,
      $productRom,
      $productImage,
      $productPrice
      )
    {
      $this -> productId = $productId;
      $this -> productColorId = $productColorId;
      $this -> productRam = $productRam;
      $this -> productRom = $productRom;
      $this -> productImage = $productImage;
      $this -> productPrice = $productPrice;
    }
 }

 class MyClass {
  public function __construct() {}
}

   class dataObject
  {
    function dataObject(
      $objectProduct,
      $detailList
      )
    {
      $this -> objectProduct = $objectProduct;
      $this -> detailList = $detailList;
    }
 }

 if ($productId == "") {
   getResult(-2,"Vui lòng nhập đủ thông tin");
 }else{
    $object = getProduct($productId,$con);
    $array = getProductDetailList($productId,$con);
    $data = new dataObject($object,$array);
    $object1 = new Data(0,"Danh sách sản phẩm",$data);
    echo json_encode($object1);
 }

  function getProduct($productId,$con) {
    $query = "SELECT * FROM product where productId = '$productId'";
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
      $row['productAccess'],
      $row['productImage'],
      $row['productPrice'] 
    ));
 }
}else{
  getResult(-1,"Lỗi server");
}
if (empty($arrayProduct[0])) {
return new MyClass();
}
return $arrayProduct[0];
}

function getProductDetailList($productId,$con) {
    $query = "SELECT * FROM productDetail where productId = '$productId'";
    $data =  mysqli_query($con,$query);

  $arrayProductDetail = array();
if ($data) {
  while($row = mysqli_fetch_assoc($data)){
    array_push($arrayProductDetail,
     new productDetail(
      $row['productId'],
      $row['productColorId'],
      $row['productRam'],
      $row['productRom'],
      $row['productImage'],
      $row['productPrice']
    ));
 }
}else{
   getResult(-1,"Lỗi server");
}

if (empty($arrayProductDetail[0])) {
return array();
}
   return $arrayProductDetail;
}

   function getResult($code, $msg,$data =array())
 {
  $object = new Data($code,$msg,$data);
  echo json_encode($object);
 }

?>