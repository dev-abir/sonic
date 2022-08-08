from django.contrib import admin

from sonic_server_app.models import *

admin.site.register(
    [
        # Pc,
        Test,
        Question,
        TestCase,
        Solution,
        SolutionTestCase,
    ]
)
