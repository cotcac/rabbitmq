var amqp = require("amqplib/callback_api");
amqp.connect("amqp://localhost", function(error, connection){
    if(error) throw error;
    connection.createChannel(function(error, channel){
        if(error) throw error;
        var queue ="hello";
        channel.assertQueue(queue,{
            durable:false
        });
        console.log("waiting for message from", queue);
        channel.consume(queue,function(msg){
            // convert msg from Binary to String
            let str = msg.content.toString();
            // convert to json
            let json = JSON.parse(str);
            console.log(json);
            console.log("[x] receive message ", str);
        },{
            noAck:true
        });

        
    })
})