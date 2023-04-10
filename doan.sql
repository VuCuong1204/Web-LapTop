create database thudoan
use thudoan
create table account(
id int identity(1,1) primary key,
username Varchar(50) not null unique,
password Varchar(50) not null,
position int not null,
)
go
create table users(
id int foreign key references account(id),
fullname Nvarchar(50) not null,
email Varchar(50) not null ,
phonenumber Varchar(50) not null,
address Nvarchar(150) not null,
);
go
create table productType(
productTypeId Varchar(50) not null primary key,
manufacturer Nvarchar(50) not null,
productTypeImage varchar(100) not null,
);
go
create table product(
productId Varchar(50) not null primary key,
productTypeId Varchar(50) foreign key references productType(productTypeId),
productName Nvarchar(50) not null unique,
productCPU Varchar(50) ,
productCard Varchar(50) ,
productScreen Varchar(50),--kích thước màn hình
productResolution Varchar(50),--Độ phân giải
productTouch Varchar(50),--Cảm ứng
productMaterial Varchar(50),--Chất liệu
productWeight Varchar(50),--Cân nặng
productWebcam Varchar(50),--Độ phân giải camera
productSystem Varchar(50),--Hệ điều hành
productSpecial Nvarchar(150),--Tính năng đặc biệt khác
productAccess bigint default 0, -- lượt truy cập
);
go
create table listImage(
productId Varchar(50) foreign key references product(productId),
productPrice bigint not null, -- giá tiền
productImage varchar(100),
productColor Nvarchar(50),
productRam Varchar(50) ,
productRom Varchar(50) ,
);
create table cart(
cartId int foreign key references account(id),
productId Varchar(50) foreign key references product(productid),
quantity int not null,
);
