# Generated by Django 5.0 on 2024-04-15 16:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0008_contact'),
    ]

    operations = [
        migrations.CreateModel(
            name='ReceiveData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer', models.BooleanField()),
                ('time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
