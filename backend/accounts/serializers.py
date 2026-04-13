from django.contrib.auth.models import User
from rest_framework import serializers



class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8, style={'input_type': 'password'})  # The style={'input_type': 'password'} will render the password field as a password input in the browsable API, which will hide the characters as they are typed.
    class Meta:
        model = User
        fields = ['username', 'email', 'password' ]


    def create(self, validated_data):

        # User.objects.create ==> save the password in plain text. ,, User.objects.create_user ==> automatically hash the password
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
        # user = User.objects.create_user(**validated_data)   # This is an alternative way to create the user, it will unpack the validated_data dictionary and pass the values as arguments to the create_user method. It achieves the same result as the previous code block. if there is a billing data in the validated_data, it will cause an error because the create_user method does not expect a billing argument. So we need to make sure that the validated_data only contains the fields that are required by the create_user method.
        return user

