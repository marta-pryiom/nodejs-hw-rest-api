import Mailgen from 'mailgen'
class EmailService {
  constructor(env, sender) {
    this.sender = sender
    switch (env) {
      case 'development':
        this.link = 'http://localhost:5050'
        break
      case 'test':
        this.link = 'http://localhost:3000'
        break
      case 'production':
        this.link = 'http://heroku'
        break
      default:
        this.link = 'http://localhost:5050'
    }
  }

  createEmailTemplate(username, verifyToken) {
    const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Marta',
        link: this.link,
      },
    })
    const email = {
      body: {
        name: username,
        intro: 'Welcome ! We are very excited to have you on board.',
        action: {
          instructions: 'To get started with our API, please click here:',
          button: {
            color: '#22BC66',
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
        outro: 'Test of postservice by Marta',
      },
    }
    return mailGenerator.generate(email)
  }

  async sendVerifyEmail(email, username, verifyToken) {
    const emailBody = this.createEmailTemplate(username, verifyToken)
    const msg = {
      to: email,
      subject: 'Verify email',
      html: emailBody,
    }
    try {
      const result = await this.sender.send(msg)
      console.log(result)
      return true
    } catch (error) {
      console.error(error.message)
      return false
    }
  }
}
export default EmailService
