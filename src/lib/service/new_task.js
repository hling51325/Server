const { connect } = require('./rabbitMQ')
connect()
    .then(({ ch }) => {
        var q = 'task_queue';
        var msg = process.argv.slice(2).join(' ') || "Hello World!";

        ch.assertQueue(q, { durable: true });
        ch.sendToQueue(q, new Buffer(msg), { persistent: true });
        console.log(" [x] Sent '%s'", msg);
    })