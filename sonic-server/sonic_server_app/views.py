from rest_framework import viewsets, generics
from rest_framework import permissions as rf_perms

from sonic_server_app.models import *
from sonic_server_app.serializers import *

from sonic_server_app import permissions


# NOTE: by deafault IsAdminOrReadOnly permission is already applied (see seetings.py)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    # TODO: let the users create own users and groups?
    permission_classes = [rf_perms.AllowAny]


class GroupViewset(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    # TODO: let the users create own users and groups?
    permission_classes = [rf_perms.IsAuthenticatedOrReadOnly & permissions.IsLeaderOwner]


class TestViewset(viewsets.ModelViewSet):
    queryset = Test.objects.all()
    serializer_class = TestSerializer


class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class QuestionViewset(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class SolutionView(generics.CreateAPIView, generics.RetrieveAPIView):
    queryset = Solution.objects.all()
    serializer_class = SolutionSerializer
    permission_classes = [permissions.IsSolutionOwner]


class TestCaseViewset(viewsets.ModelViewSet):
    queryset = TestCase.objects.all()
    serializer_class = TestCaseSerializer


class SolutionTestCaseViewset(viewsets.ModelViewSet):
    queryset = SolutionTestCase.objects.all()
    serializer_class = SolutionTestCaseSerializer
