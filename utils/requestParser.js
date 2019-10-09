const requestParser = (request) => {
    let privacy, newsletter;
    privacy = request.privacy_accepted;
    newsletter = request.newsletter_accepted
    return {
        privacy: privacy === 'on' ? privacy = true : privacy = false,
        newsletter: newsletter === 'on' ? newsletter = true : newsletter = false
    }
}

module.exports = requestParser;