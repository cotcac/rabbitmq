const amqp = require("amqplib/callback_api")

amqp.connect(function (err, connection) {
    if (err) throw err;
    connection.createChannel(function (err, channel) {
        if (err) throw err;
        const exchange = "direct_logs";
        channel.assertExchange(exchange, "direct", {
            durable: false
        })
        channel.assertQueue("", {
            exclusive: true
        }, function (err, q) {
            if (err) throw err;
            console.log("[x] waiting for logs");

            channel.bindQueue(q.queue, exchange,"info");

            channel.consume(q.queue, function (msg) {
                console.log("[x] msg:", msg.fields.routingKey, msg.content.toString());

            }, {
                    noAck: true
                })

        })
    })
})