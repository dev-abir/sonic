from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator
import datetime

# TODO: ondeletes


# class Pc(models.Model):
#     IPv4 = models.GenericIPAddressField(primary_key=True)
#     location = models.CharField(max_length=50, null=True)
#     registered = models.BooleanField(default=False)
#     # tests (fk)


class Group(models.Model):
    leader = models.OneToOneField(User, on_delete=models.CASCADE)

    # TODO: doesn't work
    extra_time = models.DurationField()

    # NOTE: only leader will have a passcode, user2 is a simple dummy user (for simplicity)
    # If we use 2 "User model", then store 2 users in db, then create a group (2 steps)
    # moreover, 2nd user by default will not have any password,
    # so the group may enter using 2nd user's email and password(blank) -> (vulnerability)
    email2 = models.EmailField(null=True)
    # solution_set (fk), test_set(fk)

    def __str__(self) -> str:
        return f"leader={self.leader} email2={self.email2}"


class Test(models.Model):
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    registered_groups = models.ManyToManyField(Group)
    name = models.CharField(max_length=30)
    # pc = models.ManyToManyField(Pc)
    # question_set (fk)

    def __str__(self) -> str:
        return self.name


class Question(models.Model):
    # TODO: size limit ?
    question_text = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    # solutions (fk), test_cases fk()

    def __str__(self) -> str:
        return self.question_text


class TestCase(models.Model):
    # TODO: size limit ?
    input = models.FileField(validators=[FileExtensionValidator(["txt"])])
    expected_output = models.FileField(validators=[FileExtensionValidator(["txt"])])
    score = models.PositiveIntegerField()
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    public = models.BooleanField(default=False)
    # solutiontestcase_set (fk)

    def __str__(self) -> str:
        return f"public={self.public} score={self.score}"


programming_languages = [
    ("c", "C"),
    ("cpp", "C++"),
    ("java", "JAVA"),
    ("python", "Python3"),
    ("javascript", "JavaScript"),
]


class Solution(models.Model):
    # TODO: size limit ?
    solution_text = models.TextField()
    language = models.CharField(max_length=20, choices=programming_languages)
    author = models.ForeignKey(Group, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    # solutiontestcase_set (fk)


results = [
    ("a", "Accepted"),
    ("tle", "Time Limit Exceeded"),
    ("wa", "Wrong Answer"),
]


class SolutionTestCase(models.Model):
    # same solution id and same test case id?
    solution = models.ForeignKey(Solution, on_delete=models.CASCADE)
    test_case = models.ForeignKey(TestCase, on_delete=models.CASCADE)
    result = models.CharField(max_length=10, choices=results)
    duration = models.DurationField()

    def __str__(self) -> str:
        return f"result={self.result} duration={self.duration}"
