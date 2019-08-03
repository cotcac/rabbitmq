const amqp = require("amqplib/callback_api")

amqp.connect(function (err, connection) {
    if (err) throw err;
    connection.createChannel(function (err, channel) {
        if (err) throw err;
        const exchange = "topic_logs";
        channel.assertExchange(exchange, "topic", {
            durable: false
        })

        channel.publish(exchange, "company.info", Buffer.from("company info"))

        channel.publish(exchange, "company.leave", Buffer.from("Kinny on vacation tmr"))

        channel.publish(exchange, "wife.call", Buffer.from("Kinny on vacation tmr"))
        // this will be ignore
        channel.publish(exchange, "advertising", Buffer.from("Do you need a new Car?"))
        
        console.log("[x] send message topic ex");
    })
    setTimeout(() => {
        connection.close();
        return;
    }, 3000);
})