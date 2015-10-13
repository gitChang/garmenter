clear
echo 'clear precompiled assests to avoid conflict...'
rake assets:clobber

clear
echo 'launching webrick...'
rails s -b 192.168.1.6 -p 3000 puma
