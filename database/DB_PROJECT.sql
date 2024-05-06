use master
drop database webData
create database webData
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
    lastName varchar(255) NOT NULL,s
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
    imagepath nvarchar(100) not null
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

ALTER TABLE Products
ADD categoryID int,
FOREIGN KEY (categoryID) REFERENCES Category(categoryID);


-- Insert category: Computers
INSERT INTO Category (categoryName) VALUES ('Computers');

-- Insert category: Peripherals
INSERT INTO Category (categoryName) VALUES ('Peripherals');

-- Continue for other categories...


-- Insert product 1
INSERT INTO Products (productName, price, description, imagepath,categoryId)
VALUES ('Ultra Gamer''s Delight', 999.99, 'Experience the pinnacle of gaming performance...', '/images/products/PC.jpg',1);

-- Insert product 2
INSERT INTO Products (productName, price, description, imagepath,categoryId)
VALUES ('Ergo-Elite Gaming Chair', 699.99, 'Elevate your gaming experience with the ultimate comfort and support of the Secretlab gaming chair.', '/images/products/gamingchair.jpeg',2);

-- Insert product 3
INSERT INTO Products (productName, price, description, imagepath,categoryId)
VALUES ('HyperStrike Mechanical Keyboard', 199.99, 'Dominate every keystroke with the precision and speed of the ASUS KJoy fully mechanical keyboard with Cherry switches.', '/images/products/keyboard.jpg',2);

-- Insert product 4
INSERT INTO Products (productName, price, description, imagepath,categoryId)
VALUES ('ROG Strix Supreme Motherboard', 699.99, 'Unleash the power of the latest technology with the cutting-edge ROG motherboard, designed for ultimate performance.', '/images/products/mobo.jpg',2);

-- Insert product 5
INSERT INTO Products (productName, price, description, imagepath,categoryId)
VALUES ('Titanic Performance Pack', 1299.99, 'Conquer any task with ease using the TREX Pack featuring an i9 13th gen processor and a massive 2TB SSD storage.', '/images/products/pcpack.jpeg',1);

-- Insert product 6
INSERT INTO Products (productName, price, description, imagepath,categoryId)
VALUES ('Titanium Edition RTX 4070TI', 899.99, 'Immerse yourself in breathtaking visuals with the ASUS RTX 4070TI, delivering unparalleled graphics performance.', '/images/products/gpu.jpg',2);

-- Insert product 7
INSERT INTO Products (productName, price, description, imagepath,categoryId)
VALUES ('Silent Fury Gaming Mouse', 699.99, 'Achieve precision and silence with the Razor K25 gaming mouse, designed for competitive gaming with whisper-quiet clicks.', '/images/products/mouse.jpeg',2);

-- Insert product 8
INSERT INTO Products (productName, price, description, imagepath,categoryId)
VALUES ('Neon Horizon RGB Case', 699.99, 'Showcase your build in style with the FNF Case featuring vibrant RGB lighting and superior airflow for optimal performance.', '/images/products/case.jpg',2);

-- Insert product 9
INSERT INTO Products (productName, price, description, imagepath,categoryId)
VALUES ('Ultimate Dual Monitor Setup', 1999.99, 'Transform your workspace into a productivity powerhouse with the Razor Pack, including dual 4K monitors and an i9 13th gen processor.', '/images/products/pcpack3.jpg',1);

-- Insert product 10
INSERT INTO Products (productName, price, description, imagepath,categoryId)
VALUES ('Mystic Beast PC', 699.99, 'Unleash the power of the Mystic Beast, featuring top-of-the-line components for unbeatable performance in gaming and productivity tasks.', '/images/products/pcpack4.jpeg',1);
select *from products