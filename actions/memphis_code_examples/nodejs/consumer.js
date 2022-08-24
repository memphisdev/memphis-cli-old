const memphis = require('memphis-dev');

(async function () {
    let memphisConn;
    try {
        memphisConn = await memphis.connect({
            host: '<memphis-host>',
            username: '<application type username>',
            connectionToken: '<broker-token>'
        });

        const consumer = await memphisConn.consumer({
            stationName: '<station-name>',
            consumerName: '<consumer-name>',
            consumerGroup: ''
        });

        consumer.on('message', (message) => {
            console.log(message.getData().toString());
            message.ack();
        });

        consumer.on('error', (error) => {
            console.log(error);
        });
    } catch (ex) {
        console.log(ex);
        memphisConn && memphisConn.close();
    }
})();
