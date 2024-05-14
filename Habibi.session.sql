select * from Orders

declare @oid int
set @oid = (select top 1 orderiD from Orders order by orderID desc)
print @oid

declare @count int
set @count=(select count(*) from cart)
print @count