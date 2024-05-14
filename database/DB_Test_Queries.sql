

use webData;
-- -- ALter TABLE Users ALTER COLUMN UserID primary_key AUTO_INCREMENT;
-- SELECT * from Users

-- ALter TABLE Users ALTER COLUMN UserID primary_key AUTO_INCREMENT;
SELECT * from Users

-- kdwk@kwndk 12
select *from products

SELECT * FROM Category C

SELECT * FROM Orders

SELECT * FROM Carts

SELECT * FROM OrderDetails

SELECT O.orderID,OD.userID,O.orderDate
FROM Orders O JOIN OrderDetails OD on OD.orderID=O.orderID
WHERE O.orderID=4


SELECT (U.firstName+' '+U.lastName) AS userName,O.orderID,O.orderDate,O.shippingAddress,O.shippingStatus,O.paymentStatus, SUM(P.price*OD.quantityOfProduct) AS totalPrice
FROM Orders O
JOIN Users U on U.userID=O.userID
JOIN OrderDetails OD on  OD.orderID=O.orderID
JOIN Products P on P.productID=OD.productID
GROUP BY O.orderID,O.orderDate,O.shippingAddress,O.shippingStatus,O.paymentStatus,O.userID,U.firstName,U.lastName
HAVING O.orderID=2008



SELECT O.orderID,O.orderDate,O.shippingAddress,O.shippingStatus,O.paymentStatus,P.productName,P.price,OD.quantityOfProduct
FROM Orders O
JOIN Users U on U.userID=O.userID
JOIN OrderDetails OD on  OD.orderID=O.orderID
JOIN Products P on P.productID=OD.productID
WHERE O.orderID=2008
GROUP BY O.orderID,O.orderDate,O.shippingAddress,O.shippingStatus,O.paymentStatus


SELECT *
FROM Orders O
JOIN OrderDetails OD on  OD.orderID=O.orderID
JOIN Products P on P.productID=OD.productID



SELECT (U.firstName+' '+U.lastName) AS userName,O.orderID,O.orderDate,O.shippingAddress,O.shippingStatus,O.paymentStatus, SUM(P.price*OD.quantityOfProduct) AS totalPrice
FROM Orders O
JOIN Users U on U.userID=O.userID
JOIN OrderDetails OD on  OD.orderID=O.orderID
JOIN Products P on P.productID=OD.productID
GROUP BY O.orderID,O.orderDate,O.shippingAddress,O.shippingStatus,O.paymentStatus,O.userID,U.firstName,U.lastName
HAVING O.orderID=2008