from rest_framework import permissions


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        # allow safe methods... GET, LIST etc...
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user.is_superuser


class IsLeaderOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # allow safe methods... GET, LIST etc...
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.leader == request.user


class IsSolutionOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.author.leader == request.user
