from django import forms
from .models import Message, Contact


class MessageForm(forms.ModelForm):
    class Meta:
        model = Message
        fields = ['name', 'email', 'service', 'message']

        widgets = {
            'name' : forms.TextInput(attrs={'name': 'name', 'id': 'id_name', 'class': 'form-control','type': 'text', 'placeholder' : 'Uveďte Vaše meno'}),
            'email' : forms.TextInput(attrs={'name': 'email', 'id': 'id_email', 'class': 'form-control','type': 'email', 'placeholder' : 'Vložte Váš e-mail'}),
            'service': forms.Select(attrs={'name': 'service', 'id': 'id_service', 'class': 'form-control'}),
            'message': forms.Textarea(attrs={'name': 'message', 'id': 'id_message', 'class': 'form-control', 'cols': 30, 'rows': 7, 'placeholder' : 'Uveďte prosím Vašu správu'}),
        }


class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ['name', 'surname', 'email', 'subject', 'message']
        
        widgets = {
            'name' : forms.TextInput(attrs={'name': 'name', 'id': 'name', 'class': 'form-control','type': 'text', 'placeholder' : 'Uveďte Vaše meno'}),
            'surname' : forms.TextInput(attrs={'name': 'name', 'id': 'name', 'class': 'form-control','type': 'text', 'placeholder' : 'Uveďte Váše priezvisko'}),
            'email' : forms.TextInput(attrs={'name': 'email', 'id': 'email', 'class': 'form-control','type': 'email', 'placeholder' : 'Vložte Váš e-mail'}),
            'subject': forms.TextInput(attrs={'name': 'subject', 'id': 'subject', 'class': 'form-control','type': 'text', 'placeholder' : 'Uveďte tému'}),
            'message': forms.Textarea(attrs={'name': 'message', 'id': 'message', 'class': 'form-control', 'cols': 30, 'rows': 4, 'placeholder' : 'Uveďte prosím Vašu správu'}),
        }
