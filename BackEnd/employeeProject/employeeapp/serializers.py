from rest_framework import serializers
from .models import Employee, Users

class EmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employee
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):

    confirm_password = serializers.CharField(write_only=True)  # Add confirm_password field for validation

    class Meta:
        model = Users
        fields = ['id', 'admin_name', 'email', 'username', 'password', 'confirm_password']

    def validate(self, attrs):

        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):

        validated_data.pop('confirm_password', None)
        print("Validated Data:", validated_data)
        try:
            user = Users(**validated_data)
            user.save()
            response_data = {
                'id': user.id,
                'admin_name': user.admin_name,
                'email': user.email,
                'username': user.username,
                'password': user.password,
            }

            return response_data
        except Exception as e:
            print("Error saving user:", str(e))
            raise e

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            try:
                user = Users.objects.get(username=username)
            except Users.DoesNotExist:
                raise serializers.ValidationError('User does not exist')

            if password != user.password:
                raise serializers.ValidationError('Invalid username or password.')

            attrs['user'] = user
        else:
            raise serializers.ValidationError('Must include username and password.')

        return attrs