const amqp = require("amqplib/callback_api")

amqp.connect(function (err, connection) {
    if (err) throw err;
    connection.createChannel(function (err, channel) {
        if (err) throw err;
        const queue = "rpc_queue";
        channel.assertQueue(queue, {
            durable: false
        });
        channel.prefetch(1);
        console.log("[x] server worker: waiting for rpc request");
        channel.consume(queue, function reply(msg) {
            const n = parseInt(msg.content.toString());
            console.log("[x] receive: ", n);
            const result = double(n);
            channel.sendToQueue(msg.properties.replyTo, Buffer.from(result.toString()), {
                correlationId: msg.properties.correlationId
            });
            channel.ack(msg)
        })
    })
})

function double(n) {
    return n * 2;
}