clear
echo 'clear precompiled assests to avoid conflict...'
rake assets:clobber

clear
echo 'launching webrick...'
rails s -b 192.168.1.15 -p 3000
