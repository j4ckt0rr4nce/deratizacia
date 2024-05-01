from django.shortcuts import render, redirect
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.mail import send_mail
from django.contrib import messages
from django.conf import settings
from .models import Message, Contact
from .forms import MessageForm, ContactForm
from django.views.generic import TemplateView, FormView, ListView
from django.http import JsonResponse
from django.core.serializers import serialize


class IndexView(FormView):
    form_class = MessageForm
    template_name = 'index.html'
    success_url = '/'

    def form_invalid(self, form):
        response = super(IndexView, self).form_invalid(form)
        if self.request.is_ajax():
            return JsonResponse(form.errors, status=400)
        else:
            return response

    def form_valid(self, form):
        data = {}
        response = super(IndexView, self).form_valid(form)
        if self.request.headers.get('x-requested-with') == 'XMLHttpRequest':
            message = "{name} / {email} / {service} said: ".format(
                name=form.cleaned_data.get('name'),
                email=form.cleaned_data.get('email'),
                service=form.cleaned_data.get('service'),
                )
            message += "\n\n{0}".format(form.cleaned_data.get('message'))
            send_mail(
                subject=form.cleaned_data.get('service').strip(),
                message=message,
                from_email= settings.EMAIL_HOST_USER,
                recipient_list=['ciapivan@gmail.com'],
                fail_silently=False,)
            form.save()
            data['status'] = 'ok'
            return JsonResponse(data)
        else:
            return response


class AboutMeView(FormView):
    form_class = MessageForm
    template_name = 'about-me.html'
    success_url = '/o_mne/'

    def form_invalid(self, form):
        response = super(AboutMeView, self).form_invalid(form)
        if self.request.is_ajax():
            return JsonResponse(form.errors, status=400)
        else:
            return response

    def form_valid(self, form):
        data = {}
        response = super(AboutMeView, self).form_valid(form)
        if self.request.headers.get('x-requested-with') == 'XMLHttpRequest':
            message = "{name} / {email} / {service} said: ".format(
                name=form.cleaned_data.get('name'),
                email=form.cleaned_data.get('email'),
                service=form.cleaned_data.get('service'),
                )
            message += "\n\n{0}".format(form.cleaned_data.get('message'))
            send_mail(
                subject=form.cleaned_data.get('service').strip(),
                message=message,
                from_email= settings.EMAIL_HOST_USER,
                recipient_list=['ciapivan@gmail.com'],
                fail_silently=False,)
            form.save()
            data['status'] = 'ok'
            return JsonResponse(data)
        else:
            return response


class ContactView(FormView):
    form_class = ContactForm
    template_name = 'contact.html'
    success_url = '/kontakt/'

    def form_valid(self, form):
        message = "{name} {surname} / {email} / {subject} said: ".format(
            name=form.cleaned_data.get('name'),
            surname=form.cleaned_data.get('surname'),
            email=form.cleaned_data.get('email'),
            subject=form.cleaned_data.get('subject'))
        message += "\n\n{0}".format(form.cleaned_data.get('message'))
        send_mail(
            subject=form.cleaned_data.get('subject').strip(),
            message=message,
            from_email= settings.EMAIL_HOST_USER,
            recipient_list=['ciapivan@gmail.com'],
            fail_silently=False,)
        form.save()
        messages.success(self.request, 'Vaša správa bola úspešne odoslaná.')
        return super().form_valid(form)

    def form_invalid(self, form):
        form.add_error(None, 'Ups .. niečo je zle.')
        return super().form_invalid(form)


class ServicesView(TemplateView):
    template_name = 'services.html'

class PrivacyPolicyView(TemplateView):
    template_name = 'privacy-policy.html'
