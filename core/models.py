from django.db import models


SLUZBY_CHOICES = [
        ('Služby', 'Služby'),
        ('Dezinsekcia obtiažneho hmyzu', 'Dezinsekcia obtiažneho hmyzu'),
        ('Deratizácia hlodavcov', 'Deratizácia hlodavcov'),
        ('Likvidácia osích a sršních hniezd', 'Likvidácia osích a sršních hniezd'),
        ('Ničenie baktérií a plesní', 'Ničenie baktérií a plesní'),
        ('Dezinfekcia a vypratanie bytu po zosnulom', 'Dezinfekcia a vypratanie bytu po zosnulom'),
        ('Dezinfekcia po vtáčom truse', 'Dezinfekcia po vtáčom truse'),
    ]

class Message(models.Model):
    name = models.CharField(max_length=20)
    email = models.EmailField()
    service = models.CharField(choices=SLUZBY_CHOICES, default='Služby', max_length=41)
    message = models.TextField()
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.service}"



class Contact(models.Model):
    name = models.CharField(max_length=20)
    surname = models.CharField(max_length=20)
    email = models.EmailField()
    subject = models.CharField(max_length=20)
    message = models.TextField()
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} {self.surname} - {self.subject}"