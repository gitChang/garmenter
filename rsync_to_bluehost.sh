clear

read -p 'Confirm Deploy to Bluehost (y/n): ' choice
echo

if [[ ! $choice =~ ^[Yy]$ ]]
then
  exit 1
fi

clear

echo "Start copying files to Bluehost..."

rsync -arv --exclude-from=cp_exclude ../laundry tukusing@tuku-singapore.com:/home3/tukusing/

clear

echo "Done deploy to Bluehost."
