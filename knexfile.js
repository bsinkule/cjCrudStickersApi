// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/cjs_web_store'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/test_cjs_web_store'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};