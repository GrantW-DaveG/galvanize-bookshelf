brew install heroku

heroku create grant-dave-galvanize-bookshelf

heroku config:set 'JWT_KEY=5AhdmefVs8NL2sx1creXCeRoiOEXfPZKFL6fY6v5/xRbqXXnvLKN6QZ7wlx0urxG TCzLxm9gaWJNSwysp4/rjg=='

heroku addons:create heroku-postgresql:hobby-dev

heroku create

git push heroku master

(then add hreoku-postbuild script to package.json.  Already there for us...)
"scripts": {
  "heroku-postbuild": "knex migrate:latest",
  ...
)

heroku run bash
npm run knex seed:run
exit

(add Procfile containing only "web: node server.js" without quotes)

heroku open

