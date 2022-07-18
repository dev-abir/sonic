# Generated by Django 4.0.6 on 2022-07-18 14:35

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('extra_time', models.DurationField()),
                ('username2', models.CharField(max_length=50, null=True)),
                ('email2', models.EmailField(max_length=254, null=True)),
                ('leader', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question_text', models.TextField()),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Solution',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('solution_text', models.TextField()),
                ('language', models.CharField(choices=[('c', 'C'), ('cpp', 'C++'), ('java', 'JAVA'), ('python', 'Python3'), ('javascript', 'JavaScript')], max_length=20)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sonic_server_app.group')),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sonic_server_app.question')),
            ],
        ),
        migrations.CreateModel(
            name='TestCase',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('input', models.FileField(upload_to='', validators=[django.core.validators.FileExtensionValidator(['txt'])])),
                ('expected_output', models.FileField(upload_to='', validators=[django.core.validators.FileExtensionValidator(['txt'])])),
                ('score', models.PositiveIntegerField()),
                ('public', models.BooleanField(default=False)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sonic_server_app.question')),
            ],
        ),
        migrations.CreateModel(
            name='Test',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('name', models.CharField(max_length=30)),
                ('registered_groups', models.ManyToManyField(to='sonic_server_app.group')),
            ],
        ),
        migrations.CreateModel(
            name='SolutionTestCase',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('result', models.CharField(choices=[('a', 'Accepted'), ('tle', 'Time Limit Exceeded'), ('wa', 'Wrong Answer')], max_length=10)),
                ('duration', models.DurationField()),
                ('solution', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sonic_server_app.solution')),
                ('test_case', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sonic_server_app.testcase')),
            ],
        ),
        migrations.AddField(
            model_name='question',
            name='test',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sonic_server_app.test'),
        ),
    ]
