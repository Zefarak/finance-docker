# Generated by Django 3.0.5 on 2021-04-25 15:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tickers', '0008_ticker_sharp'),
    ]

    operations = [
        migrations.AddField(
            model_name='portfolio',
            name='date_investment',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='portfolio',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='portfolios', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='ticker',
            name='updated',
            field=models.DateTimeField(blank=True),
        ),
    ]
