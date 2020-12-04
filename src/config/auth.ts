export default {
  jwt: {
    secret: process.env.APP_SECRET || '123',
    expiresIn: '1d'
  }
}
