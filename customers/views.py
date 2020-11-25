import os
from django.contrib.auth.models import User
from django.db.utils import DatabaseError
from django.views.generic import FormView, View
from customers.forms import GenerateUsersForm
from customers.models import Client
from random import choice
from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings


class TenantView(FormView):
    form_class = GenerateUsersForm
    template_name = "index_tenant.html"
    success_url = "/"

    def get_context_data(self, **kwargs):
        context = super(TenantView, self).get_context_data(**kwargs)
        context['tenants_list'] = Client.objects.all()
        context['users'] = User.objects.all()
        return context

    def form_valid(self, form):
        User.objects.all().delete()  # clean current users

        # generate five random users
        USERS_TO_GENERATE = 5
        first_names = ["Aiden", "Jackson", "Ethan", "Liam", "Mason", "Noah",
                       "Lucas", "Jacob", "Jayden", "Jack", "Sophia", "Emma",
                       "Olivia", "Isabella", "Ava", "Lily", "Zoe", "Chloe",
                       "Mia", "Madison"]
        last_names = ["Smith", "Brown", "Lee	", "Wilson", "Martin", "Patel",
                      "Taylor", "Wong", "Campbell", "Williams"]

        while User.objects.count() != USERS_TO_GENERATE:
            first_name = choice(first_names)
            last_name = choice(last_names)
            try:
                user = User(username=(first_name + last_name).lower(),
                            email="%s@%s.com" % (first_name, last_name),
                            first_name=first_name,
                            last_name=last_name)
                user.save()
            except DatabaseError:
                pass

        return super(TenantView, self).form_valid(form)

def manager(request, *args, **kwargs):
    return render(request, "index_manager.html")


class ManagerAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    run build`).
    """

    def get(self, request):
        try:
            with open(os.path.join(settings.MANAGER_APP_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `yarn run build` to test the production version.
                """,
                status=501,
            )
