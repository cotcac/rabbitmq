var amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function(error, connection){
    if(error) throw error;

    connection.createChannel(function(error, channel){
        if(error) throw error;
        var queue ="hello"
        var myJson ={
            name:"Kinny",
            age:30
        }
        var msg = JSON.stringify(myJson);
        channel.assertQueue(queue,{
            durable:false
        });
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log("[x] sent message", msg);
        
    });
    setTimeout(() => {
        connection.close();
        return
    }, 500);
});