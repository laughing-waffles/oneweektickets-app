events="$(curl https://oneweektickets.com/api/events 2>/dev/null)"
echo $events | jq '.[].id'
