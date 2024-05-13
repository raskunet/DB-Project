    use master
    drop database webData
    create database webData
    use webData;
    SELECT * FROM Sys.Tables
    SELECT * FROM Orders
drop table Users
create table Users(
    userID int NOT NULL IDENTITY (1,1),
    firstName nvarchar(30) NOT NULL,
    lastName nvarchar(30),
    emailAddress nvarchar(40) not null UNIQUE,
    userType int NOT NULL,
    userPassword nvarchar(30) not null,
    primary key (userID)
);
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

drop table Products
CREATE TABLE Products (
    productID int primary key IDENTITY (1,1),
    productName nvarchar(100) not null,
    price decimal(10, 2) not null,
    description nvarchar(255),
    imagepath nvarchar(100) not null,
    categoryID int NOT NULL,
    FOREIGN KEY (categoryID) references Category(categoryID),
);




    create table Cart(
        userID int foreign key references Users(userID),
        productID int foreign key references Products(productID),
        Quantity int,
        primary key(userID,productID)
    );

    DROP TABLE Orders

    create table Orders(
        orderID int primary key IDENTITY (1,1),
        orderDate date not null,
        shippingStatus varchar(1) not null,  -- 
        paymentStatus varchar(1) not null, -- P U While U dont't process Order
        shippingAddress varchar(50) not null,
        userID int NOT NULL FOREIGN KEY references Users(userID),
        -- Total cost is calculated at run time
    );

    -- Items ordered against this OrderID
    DROP TABLE OrderDetails
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
INSERT INTO Products (productName, price, description, imagepath, categoryID)
VALUES ('Ultra Gamer''s Delight', 999.99, 'Experience the pinnacle of gaming performance...', '/images/products/PC.jpg',1);

-- Insert product 2
INSERT INTO Products (productName, price, description, imagepath, categoryID)
VALUES ('Ergo-Elite Gaming Chair', 699.99, 'Elevate your gaming experience with the ultimate comfort and support of the Secretlab gaming chair.', '/images/products/gamingchair.jpeg',2);

-- Insert product 3
INSERT INTO Products (productName, price, description, imagepath, categoryID)
VALUES ('HyperStrike Mechanical Keyboard', 199.99, 'Dominate every keystroke with the precision and speed of the ASUS KJoy fully mechanical keyboard with Cherry switches.', '/images/products/keyboard.jpg',2);

-- Insert product 4
INSERT INTO Products (productName, price, description, imagepath, categoryID)
VALUES ('ROG Strix Supreme Motherboard', 699.99, 'Unleash the power of the latest technology with the cutting-edge ROG motherboard, designed for ultimate performance.', '/images/products/mobo.jpg',2);

-- Insert product 5
INSERT INTO Products (productName, price, description, imagepath, categoryID)
VALUES ('Titanic Performance Pack', 1299.99, 'Conquer any task with ease using the TREX Pack featuring an i9 13th gen processor and a massive 2TB SSD storage.', '/images/products/pcpack.jpeg',1);

-- Insert product 6
INSERT INTO Products (productName, price, description, imagepath, categoryID)
VALUES ('Titanium Edition RTX 4070TI', 899.99, 'Immerse yourself in breathtaking visuals with the ASUS RTX 4070TI, delivering unparalleled graphics performance.', '/images/products/gpu.jpg',2);

-- Insert product 7
INSERT INTO Products (productName, price, description, imagepath, categoryID)
VALUES ('Silent Fury Gaming Mouse', 699.99, 'Achieve precision and silence with the Razor K25 gaming mouse, designed for competitive gaming with whisper-quiet clicks.', '/images/products/mouse.jpeg',2);

-- Insert product 8
INSERT INTO Products (productName, price, description, imagepath, categoryID)
VALUES ('Neon Horizon RGB Case', 699.99, 'Showcase your build in style with the FNF Case featuring vibrant RGB lighting and superior airflow for optimal performance.', '/images/products/case.jpg',2);

-- Insert product 9
INSERT INTO Products (productName, price, description, imagepath, categoryID)
VALUES ('Ultimate Dual Monitor Setup', 1999.99, 'Transform your workspace into a productivity powerhouse with the Razor Pack, including dual 4K monitors and an i9 13th gen processor.', '/images/products/pcpack3.jpg',1);

-- Insert product 10
INSERT INTO Products (productName, price, description, imagepath, categoryID)
VALUES ('Mystic Beast PC', 699.99, 'Unleash the power of the Mystic Beast, featuring top-of-the-line components for unbeatable performance in gaming and productivity tasks.', '/images/products/pcpack4.jpeg',1);
select *from products



-- Inserting data into Orders table
INSERT INTO Orders (orderDate, shippingStatus, paymentStatus, shippingAddress, userID)
VALUES 
    ('2024-05-10', 'P', 'U', '123 Main St, City, Country', 3),
    ('2024-05-09', 'P', 'P', '456 Elm St, Town, Country', 4),
    ('2024-05-08', 'S', 'P', '789 Oak St, Village, Country', 3),
    ('2024-05-07', 'S', 'U', '101 Pine St, Hamlet, Country', 4),
    ('2024-05-06', 'P', 'P', '202 Maple St, Borough, Country', 3);

SELECT * FROM Orders
SELECT * FROM OrderDetails
-- Inserting data into OrderDetails table
INSERT INTO OrderDetails (orderID, userID, productID, quantityOfProduct)
VALUES
    (4, 3, 9, 2),
    (4, 3, 3, 1),
    (5, 3, 5, 3),
    (5, 4, 10, 1),
    (6, 4, 4, 2),
    (6, 3, 10, 1),
    (7, 4, 11, 1);
