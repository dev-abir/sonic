#!/usr/bin/bash

# python manage.py flush
rm db.sqlite3
rm sonic_server_app/migrations/000*.py
echo "del db done..."

python manage.py makemigrations
python manage.py migrate
echo "restore db done..."

echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', 'admin@admin.admin', 'pass')" | python manage.py shell
echo "createsuperuser (uname=admin, pass=pass) done"
