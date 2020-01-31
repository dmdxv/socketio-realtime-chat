# socketio-realtime-chat
Real time chat app using Express, SocketIO and React. Users chat by making rooms or joining existing rooms. 

## Installation 
```
git clone https://github.com/dmdxv/socketio-realtime-chat.git

# Setting up server
/cd server
npm install
npm start

# Setting up client
/cd client
npm install
npm start
```

## Bugs
Server crash when user leaves room
If server restarts whilst users are connected, the server will crash upon next socket event.

![](https://i.gyazo.com/14983077a09e1abc40d158e66263849b.png)
