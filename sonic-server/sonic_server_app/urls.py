from django.urls import include, path
from rest_framework import routers
from sonic_server_app import views

router = routers.DefaultRouter()
router.register(r"tests", views.TestViewset)
router.register(r"groups", views.GroupViewset)
router.register(r"users", views.UserViewset)
router.register(r"questions", views.QuestionViewset)
# router.register(r"solutions", views.SolutionViewset)
router.register(r"test-cases", views.TestCaseViewset)
router.register(r"solution-test-cases", views.SolutionTestCaseViewset)

urlpatterns = [
    path("", include(router.urls)),
    path("solutions/<int:pk>", views.SolutionView.as_view(), name="solution-detail"),
    path("register", views.RegisterView.as_view(), name="register"),
]
