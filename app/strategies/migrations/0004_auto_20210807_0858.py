# Generated by Django 3.1.6 on 2021-08-07 05:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('strategies', '0003_auto_20210705_1322'),
    ]

    operations = [
        migrations.AlterField(
            model_name='strategy',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='strategyticker',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
