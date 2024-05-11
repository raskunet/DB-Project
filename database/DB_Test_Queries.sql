

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