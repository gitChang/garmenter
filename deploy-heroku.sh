clear

echo 'removing previous compiled assets...'
rake assets:clobber

clear

echo 'clearing cache...'
rake tmp:cache:clear

clear

echo 'precompiling assets for production...'
rake assets:precompile

clear

echo 'adding files to git...'
git add .

clear

echo 'committing files...'
git commit -m "auto-commit"

clear

echo 'pushing to heroku master...'
git push heroku master

clear

echo 'launching web app...'
heroku open

