clear

echo 'clearing cache...'
rake tmp:cache:clear

echo 'precompiling assets for production...'
rake assets:precompile

echo 'adding files to git...'
git add .

echo 'committing files...'
git commit -m "auto-commit"

echo 'pushing to heroku master...'
git push heroku master

echo 'launching web app...'
heroku open

