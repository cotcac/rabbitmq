const amqp = require("amqplib/callback_api");

amqp.connect(function(err, connection){
    if(err) throw err;
    connection.createChannel(function(err, channel){
        if(err) throw err;
        channel.assertQueue("",{
            exclusive:true
        }, function(err, q){
            if(err) throw err;
            const correlationId = generateUuid();
            var num = 3;
            console.log("[x] request double number:", num);
            channel.consume(q.queue, function(msg){
                if(msg.properties.correlationId == correlationId){
                    console.log("[x] got ", msg.content.toString());
                    setTimeout(() => {
                        connection.close();
                        return;
                    }, 1000);
                    
                }
            },{
                noAck: true
            })
            channel.sendToQueue("rpc_queue", Buffer.from(num.toString()),{
                correlationId:correlationId,
                replyTo:q.queue
            })
        });
    })
})

function generateUuid() {
    return Math.random().toString() +
           Math.random().toString() +
           Math.random().toString();
  }