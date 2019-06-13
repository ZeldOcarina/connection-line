const mailchimpSubscribe = (email, name, phone) => {

    const dataObj = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                NAME: name,
                PHONE: phone
            }
        }]
    };

    const data = JSON.stringify(dataObj);

    const options = {
        url: 'https://us20.api.mailchimp.com/3.0/lists/' + process.env.LIST_ID,
        method: 'POST',
        headers: {
            "Authorization": "anyString " + process.env.MAILCHIMP_KEY
        },
        body: data
    };

    request(options, (err, res, body) => {
        if (err) console.error(err)
    });
}

module.exports = mailchimpSubscribe;