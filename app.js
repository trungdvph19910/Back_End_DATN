const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connect = require('./database');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const cors = require('cors');
app.use(express.json());
const routerProduct = require('./src/router/product')
const corsOptions = {
    origin: '*', // Địa chỉ nguồn bạn muốn cho phép
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Các phương thức được phép
    credentials: true, // Cho phép gửi cookie (nếu cần)
    optionsSuccessStatus: 204, // Trả về mã trạng thái 204 (No Content) cho yêu cầu kiểm tra trước
};

app.use(cors(corsOptions));
app.use('/api', routerProduct)

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (message) => {
        console.log(`Received message: ${message}`);
        io.emit('message', message); // Gửi tin nhắn tới tất cả các kết nối
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
connect.connect((err) => {
    if (err) {
        console.log('That bai !');
    }
    console.log('Thanh cong');
})
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});