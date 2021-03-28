// import Queue from 'bull';
const Queue = require('bull')

const sendMailQueue = new Queue('sendMail', {
  redis: {
    host: 'redis-16318.c256.us-east-1-2.ec2.cloud.redislabs.com',
    port: 16318,
    password: 'RN8LASxaNRLysrLR2BYx6Q7NOyx7pNFk'
  }
});

const data = {
  status: true
};

const options = {
  delay: 60000,
  attempts: 2
};

sendMailQueue.add(data, options);

sendMailQueue.process(async job => { 
    return await sendMail(job.data.status); 
});

function sendMail(email) {
    return new Promise((resolve, reject) => {
        console.log("Job going on...")
    });
}
