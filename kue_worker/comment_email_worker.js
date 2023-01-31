const queue = require('../config/kue');//email worker
const commentMailer = require('../mailers/comments_mailer');//to mail the comments
queue.process("emails", function(job, done){//every worker has a process function, first argument is name of process,it can be anything that we give it
    //job contains the data, the comment that we have passed
    commentMailer.newComment(job.data);//initially we were calling mailing function inside commentsController 
    //but now we will push/add the job inside 'emails' job as soon as a new comment is published 
    //for this we will go to commentsContrller and add the job to this queue
    done();
});