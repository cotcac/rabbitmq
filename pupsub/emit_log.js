var amqp = require("amqplib/callback_api")
amqp.connect(function (err, connect) {
    if (err) throw err;
    connect.createChannel(function (err, channel) {
        if (err) throw err;
        const exchange = "logs";
        const msg = "hello world";
        channel.assertExchange(exchange,"fanout", {
            durable:false
        });
        channel.publish(exchange,"",Buffer.from(msg));
        console.log("[x] send message", msg);
    })
    setTimeout(() => {
        connect.close();
        return;
    }, 500);
})