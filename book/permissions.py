from rest_framework import permissions

class  IsAdminUserOrReadOnly(permissions.BasePermission):

    """
    SAFE_METHODS [ GET, HEAD OR OPTIONS REQUESTS] - EVERY ONE,
    CREATE - ONLY ADMINS,
    UPDATE, PARTIAL_UPDATE, DESTROY - ONLY OWNER OF OBJECT
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        elif view.action == 'create':
            return request.user.is_authenticated and request.user.is_staff

        elif view.action in ['update', 'partial_update', 'destroy']:
            return request.user.is_authenticated and request.user.is_staff and obj.admin_id == request.user.id
