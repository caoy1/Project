var email = require('mailer');

email.SMTP = {
    host: 'smtp.gmail.com',
    port: 587,
    ssl: false,
    use_authentication: false,
}

email.send({
    to : "caoy1@rose-hulman.edu",
    from : "obama@whitehouse.gov",
    subject : "Caoge love you!",
    body: "Hello world.",
}, 

function(err, result) {
    if(err) {
	console.log(err);
    }
});


