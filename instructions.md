# Instructions

#### Working with sessions

1. **req.session.userID** contains the ID for currently loggedIn User.
2. For use in view, use **user**
3. You can use it for working with shop, cart, orders e.t.c

Note: Restarting server will destroy the saved session as it is stored in memory  
    In future this will be fixed by storing it in database instead