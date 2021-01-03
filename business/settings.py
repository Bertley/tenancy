import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Django settings for business project.

DEBUG = True

ADMINS = (
    # ('Your Name', 'your_email@example.com'),
)

MANAGERS = ADMINS

DATABASES = {
    "default": {
        "ENGINE": "tenant_schemas.postgresql_backend",  # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        "NAME": "postgres",  # Or path to database file if using sqlite3.
        "USER": "postgres",
        "PASSWORD": "",
        "HOST": "127.0.0.1",  # Empty for localhost through domain sockets or '127.0.0.1' for localhost through TCP.
        "PORT": "2012",  # Set to empty string for default.
    }
}

# Hosts/domain names that are valid for this site; required if DEBUG is False
# See https://docs.djangoproject.com/en/1.5/ref/settings/#allowed-hosts
ALLOWED_HOSTS = ["business.localhost", ".business.localhost"]

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# In a Windows environment this must be set to your system time zone.
TIME_ZONE = "America/Chicago"

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = "en-us"

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale.
USE_L10N = True

# If you set this to False, Django will not use timezone-aware datetimes.
USE_TZ = True

MEDIA_DIR = os.path.join(BASE_DIR, 'media')

# Absolute filesystem path to the directory that will hold user-uploaded files.
# Example: "/var/www/example.com/media/"
MEDIA_ROOT = MEDIA_DIR

# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash.
# Examples: "http://example.com/media/", "http://media.example.com/"
MEDIA_URL = '/media/'

# Absolute path to the directory static files should be collected to.
# Don't put anything in this directory yourself; store your static files
# in apps' "static/" subdirectories and in STATICFILES_DIRS.
# Example: "/var/www/example.com/static/"
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# URL prefix for static files.
# Example: "http://example.com/static/", "http://static.example.com/"
STATIC_URL = "/static/"


# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
)

# Make this unique, and don't share it with anybody.
SECRET_KEY = "as-%*_93v=r5*p_7cu8-%o6b&x^g+q$#*e*fl)k)x0-t=%q0qa"


DATABASE_ROUTERS = ("tenant_schemas.routers.TenantSyncRouter",)

TEST_RUNNER = "django.test.runner.DiscoverRunner"

MIDDLEWARE = (
    "tenant_schemas.middleware.TenantMiddleware",
    "corsheaders.middleware.CorsMiddleware", # Note that this needs to be placed above CommonMiddleware
    "django.middleware.common.CommonMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    # Uncomment the next line for simple clickjacking protection:
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'business.middleware.dev_cors_middleware'
)

ROOT_URLCONF = "business.urls_tenants"
PUBLIC_SCHEMA_URLCONF = "business.urls_public"

# Python dotted path to the WSGI application used by Django's runserver.
WSGI_APPLICATION = "business.wsgi.application"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            os.path.join(os.path.dirname(__file__), "..", "templates").replace(
                "\\", "/"
            ),
        ],
        "APP_DIRS": False,
        "OPTIONS": {
            "debug": DEBUG,
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
            "loaders": [
                "tenant_schemas.template_loaders.FilesystemLoader",
                "django.template.loaders.app_directories.Loader",
            ],
        },
    },
]

MULTITENANT_TEMPLATE_DIRS = []

SHARED_APPS = (
    "tenant_schemas",  # mandatory
    "customers",  # you must list the app where your tenant model resides in
    "users", 
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework", 
    "corsheaders",
)

TENANT_APPS = (
    # The following Django contrib apps must be in TENANT_APPS
    'django.contrib.admin',
    "django.contrib.staticfiles",
    "django.contrib.contenttypes",
    "django.contrib.auth",
    'django.contrib.sites',
    "rest_framework", 
    "corsheaders",

    'django_countries',
    "users", 
    "core"
)

TENANT_MODEL = "customers.Client"  # app.Model

DEFAULT_FILE_STORAGE = "tenant_schemas.storage.TenantFileSystemStorage"

INSTALLED_APPS = (
    "tenant_schemas",
    "customers",
    "users", 
    "core", 
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    'django.contrib.admin',

    'django.contrib.sites',
    "rest_framework", 
    "corsheaders",
    'django_countries',
)

SESSION_SERIALIZER = "django.contrib.sessions.serializers.JSONSerializer"

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 100
}

CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000',
    'http://localhost:8000',
    'http://localhost:8080',
]

JWT_AUTH = {
    'JWT_RESPONSE_PAYLOAD_HANDLER': 'business.utils.my_jwt_response_handler'
}

# A sample logging configuration. The only tangible logging
# performed by this configuration is to send an email to
# the site admins on every HTTP 500 error when DEBUG=False.
# See http://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "filters": {"require_debug_false": {"()": "django.utils.log.RequireDebugFalse"}},
    "handlers": {
        "mail_admins": {
            "level": "ERROR",
            "filters": ["require_debug_false"],
            "class": "django.utils.log.AdminEmailHandler",
        }
    },
    "loggers": {
        "django.request": {
            "handlers": ["mail_admins"],
            "level": "ERROR",
            "propagate": True,
        },
    },
}

# MIDDLEWARE.append('business.middleware.dev_cors_middleware')

MANAGER_APP_DIR = os.path.join(BASE_DIR, 'resources/manager')

# Additional locations of static files
STATICFILES_DIRS = [
    # Put strings here, like "/home/html/static" or "C:/www/django/static".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    os.path.join(BASE_DIR, 'static'),
    os.path.join(MANAGER_APP_DIR, 'build', 'static'),
]
