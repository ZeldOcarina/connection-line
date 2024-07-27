const { sendEmailWithAws } = require("../config/emailConfig");
const transporter = require("../config/nodemailer-setup");
const { blacklistWords } = require("./blacklistWords");

const { default: OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY
});

/** Checks with OpenAI if message is spam or not. In case of error, it uses a small blacklist words algorithm. 
 * @param {string} text
 * @returns {Promise<boolean>}
*/
async function checkIfSpam(text) {
    if (!text) return true
    try {
        const completion = await openai.chat.completions.create({
            "model": "gpt-4o-mini",
            n: 1,
            response_format: {
                type: "json_object"
            },
            "messages": [
                {
                    "role": "system",
                    "content": "You are a spam checker. You can only return a fixed JSON boolean. No natural language is allowed. Check the input in the message and return either true or false. JSON structure to return is: { isSpam: boolean }. Multiple languages could be used, automatically determine the language in the user message to be tested and use that against the text sentiment and content to determine if the boolean isSpam. Evaluate not comprehensible characters or Latin as spam. Messages in Italian are most likely not spam. Website is a real estate portal so requests for interest on real estate listings of any kind and in any language are never treated as spam, words like 'Objekt', 'oggetto' o 'listing'. are about valid requests. If a request is specifically in Italian, only flag it as spam if it's completely blatant as such. In general, if the request is about details on an estate, in any language, it's definitely not spam. Sometimes messages can be short like 'richiesta', that is a valid message. Also, 'Utente iscritto dal modulo di iscrizione alla newsletter.' is a system message and is never spam. Sometimes legit users might just say one word like 'Richiesta', that is because they do not have much to say but it's not spam unless that word is very spam-like."
                },
                {
                    role: "user",
                    content: text
                }
            ],
        });

        const modelResponse = JSON.parse(completion.choices[0].message.content)

        const isSpam = modelResponse.isSpam

        return isSpam
    } catch (err) {
        console.log(err);

        await transporter.sendMail({
            from: "info@connectionline.ch",
            to: "mattia@rasulomarketingstudio.com",
            cc: "",
            subject: "È avvenuto un errore nel sistema di verifica spam",
            html: `Ecco l'errore
                
                ${err}
            `})

        return text.length < 5000 &&
            !blacklistWords.some((word) => text.toLowerCase().includes(word))
    }
}

module.exports = checkIfSpam