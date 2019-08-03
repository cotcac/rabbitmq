const amqp = require("amqplib/callback_api")
amqp.connect(function (err, connection) {
    if (err) throw err;
    connection.createChannel(function (err, channel) {
        if (err) throw err;
        const exchange = "logs";
        channel.assertExchange(exchange, "fanout", {
            durable: false
        });
        channel.assertQueue("", {
            exclusive: true
        }, function (err, q) {
            if (err) throw err;
            console.log("[x] waiting for message", q.queue);
            channel.bindQueue(q.queue, exchange, "")
            channel.consume(q.queue, function (msg) {
                if (msg.content) {
                    console.log("[x] receive ", msg.content.toString());
                }
            }, {
                    noAck: true
                })

        })
    })
})