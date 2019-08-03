var amqp = require("amqplib/callback_api")
amqp.connect("amqp://localhost", function(err, connection){
    if(err) throw err;
    connection.createChannel(function(err, channel){
        if(err) throw err;
        const queue = "task_queue";
        channel.assertQueue(queue,{
            durable:true
        });
        console.log("Waiting for message from queue ");
        channel.prefetch(1);// push task to me once at a time.
        channel.consume(queue, function(msg){
            let str = msg.content.toString();
            console.log("Receive message ", str);
            // take 3 second to process the task
            setTimeout(() => {
                console.log("[x] done");
                channel.ack(msg)
                
            }, 3000);
            
        },{
            noAck:false // manual acknowledgment mode,
        })
    })
})