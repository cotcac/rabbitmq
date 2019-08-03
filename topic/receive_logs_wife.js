const amqp = require("amqplib/callback_api");

amqp.connect(function(err, connection){
    if(err) throw err;
    connection.createChannel(function(err, channel){
        if(err) throw err;
        const exchange ="topic_logs"
        channel.assertExchange(exchange,"topic", {
            durable:false
        });
        channel.assertQueue("",{
            exclusive:true
        }, function(err, q){
            if(err) throw err;
            console.log("[x] [wife.*] waiting for message");
            channel.bindQueue(q.queue, exchange,"wife.#")
            channel.consume(q.queue, function(msg){
                console.log("[x] receive message: ", msg.fields.routingKey, msg.content.toString());
                
            },{
                noAck:true
            })
            
        })
    })
})