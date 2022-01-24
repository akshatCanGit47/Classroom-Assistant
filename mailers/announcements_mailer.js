const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newAnnouncement = (classroom) => {
    let htmlString = nodeMailer.renderTemplate({post: classroom.announcement}, '/posts/new_posts.ejs');

    nodeMailer.transporter.sendMail({
       from: 'arpan@codingninjas.in',
       to: [classroom.students],
       subject: "New Comment Published!",
       html: htmlString
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}