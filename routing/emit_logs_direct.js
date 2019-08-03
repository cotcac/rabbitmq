const amqp = require("amqplib/callback_api");

amqp.connect(function (err, connection) {
    if (err) throw err;
    connection.createChannel(function (err, channel) {
        if (err) throw err;
        const exchange = "direct_logs";
        const msg = "Hello world";
        channel.assertExchange(exchange, "direct", {
            durable: false
        })
        // send random info and erro key binding.
        for (let i = 0; i < 5; i++) {
            if (i % 2 === 0) {
                channel.publish(exchange, "info", Buffer.from(msg));
            } else {
                channel.publish(exchange, "error", Buffer.from(msg));
            }
        }
        console.log("[x] send message direct ex");
    })
    setTimeout(() => {
        connection.close()
        return;
    }, 200);
})