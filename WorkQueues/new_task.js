var amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function(err, connection){
    if(err) throw err;
    connection.createChannel(function(err, channel){
        if(err) throw err;
        let queue = "task_queue";
        let msg = "Hello World!";
        channel.assertQueue(queue,{
            durable:true
        });
        channel.sendToQueue(queue,Buffer.from(msg),{
            persistent:true
        });
        console.log("[x] sent message ", msg);
    });
    // close the channel
    setTimeout(() => {
        connection.close();
        return;
    }, 500);
})