rake tmp:cache:clear
rake assets:precompile
git add .
git commit -m "auto-commit"
git push heroku master
heroku open

