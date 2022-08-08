from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from rest_framework import serializers
from sonic_server_app.models import *


class RegisterSerializer(serializers.HyperlinkedModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)  # conf password

    class Meta:
        model = User
        fields = [
            "url",
            # "first_name",
            # "last_name",
            # "username",
            "password1",
            "password2",
            "email",
        ]

    # NOTE: MAY COMMENT THIS WHILE DEVELOPMENT...
    def validate(self, attrs):
        user_creation_form = UserCreationForm(attrs)
        if not user_creation_form.is_valid():
            raise serializers.ValidationError(user_creation_form.errors)
        return attrs

    def create(self, validated_data):
        # NOTE: make username = email (for simplicity). Consider all emails are unique
        # Django always requires a username field
        user = User.objects.create_user(
            # username=validated_data["username"],
            username=validated_data["email"],
            email=validated_data["email"],
            # first_name=validated_data["first_name"],
            password=validated_data["password1"],
            # last_name=validated_data["last_name"],
        )
        return user


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = [
            "url",
            # NOTE: the backend only uses email field
            # "username",
            "email",
        ]


class SolutionTestCaseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SolutionTestCase
        fields = "__all__"


class SolutionSerializer(serializers.HyperlinkedModelSerializer):
    solutiontestcase_set = serializers.HyperlinkedRelatedField(
        view_name="solutiontestcase-detail", many=True, read_only=True
    )

    class Meta:
        model = Solution
        fields = "__all__"


class TestCaseSerializer(serializers.HyperlinkedModelSerializer):
    solutiontestcase_set = serializers.HyperlinkedRelatedField(
        view_name="solutiontestcase-detail", many=True, read_only=True
    )

    class Meta:
        model = TestCase
        fields = "__all__"


class QuestionSerializer(serializers.HyperlinkedModelSerializer):
    solution_set = serializers.HyperlinkedRelatedField(
        view_name="solution-detail", many=True, read_only=True
    )

    testcase_set = TestCaseSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = "__all__"


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    solution_set = serializers.HyperlinkedRelatedField(
        view_name="solution-detail", many=True, read_only=True
    )

    test_set = serializers.HyperlinkedRelatedField(
        view_name="test-detail", many=True, read_only=True
    )

    class Meta:
        model = Group
        fields = "__all__"
        read_only_fields = ["leader"]

    def create(self, validated_data):
        return Group.objects.create(
            extra_time=validated_data["extra_time"],
            leader=self.context["request"].user,
            email2=validated_data["email2"],
        )


class TestSerializer(serializers.HyperlinkedModelSerializer):
    question_set = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Test
        fields = "__all__"
