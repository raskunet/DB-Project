use master
drop database webData
create database WebData
use webData;

create table Users(
    userID int NOT NULL IDENTITY (1,1),
    firstName nvarchar(30) NOT NULL,
    lastName nvarchar(30),
    emailAddress nvarchar(40) not null ,
    userType int,
    userPassword nvarchar(30) not null,
    primary key (userID)
);

SELECT * FROM Users

CREATE TABLE Persons (
    personId int NOT NULL IDENTITY (1,1),
    lastName varchar(255) NOT NULL,
    firstName varchar(255),
    Age int,
    PRIMARY KEY (Personid)
);

create table Category(
    categoryID int primary key IDENTITY (1,1),
    categoryName nvarchar(30)
);

CREATE TABLE Products (
    productID int primary key IDENTITY (1,1),
    productName nvarchar(100) not null,
    price decimal(10, 2) not null,
    description nvarchar(255),
    imageFileName nvarchar(100) not null
);



create table Cart(
    userID int foreign key references Users(userID),
    productID int foreign key references Products(productID),
    Quantity int,
    primary key(userID,productID)
);

create table Orders(
    orderID int primary key IDENTITY (1,1),
    orderDate date not null,
    shippingStatus varchar(1) not null,  -- 
    paymentStatus varchar(1) not null, -- P U While U dont't process Order
    shippingAddress varchar(50) not null,
    -- Total cost is calculated at run time
);

-- Items ordered against this OrderID

create table OrderDetails(
    orderID int foreign key references Orders(orderID),
    userID int foreign key references Users(userID),
    productID int foreign key references Products(productID),
    quantityOfProduct int,
    primary key(orderID,userID,productID)
);

create table Reviews(
    userID int foreign key references Users(userID),
    productID int foreign key references Products(productID),
    orderID int foreign key references Orders(orderID),
    Text text,
    rating int check (Rating >= 1 and Rating <= 5),
    primary key(productID,orderID,userID)
);

create table WishList(
    productID int foreign key references Products(productID),
    userID int foreign key references Users(userID), 
    primary key(productID,userID)
);

ALTER TABLE Orders
ADD userID int,
FOREIGN KEY (userID) REFERENCES Users(userID);
