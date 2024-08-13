from rest_framework import serializers
from .models import Address, Experience, Resume

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

class ResumeSerializer(serializers.ModelSerializer):
    address = AddressSerializer()
    experiences = ExperienceSerializer(many=True,read_only=True)
    # image = serializers.ImageField(max_length=None, use_url=True) 

    class Meta:
        model = Resume
        fields = '__all__'

    def create(self, validated_data):
        address_data = validated_data.pop('address')
        experiences_data = validated_data.pop('experiences')
        
        # Create the address
        address = Address.objects.create(**address_data)
        
        # Create the resume
        resume = Resume.objects.create(address=address, **validated_data)
        
        # Create the experiences and add them to the resume
        for experience_data in experiences_data:
            experience = Experience.objects.create(**experience_data)
            resume.experiences.add(experience)
        
        return resume
    
    
    

    def update(self, instance, validated_data):
        experiences_data = validated_data.pop('experiences', [])
        instance = super().update(instance, validated_data)

        # Handle updating existing and adding new experiences
        existing_ids = [exp.id for exp in instance.experiences.all()]
        for exp_data in experiences_data:
            exp_id = exp_data.get('id', None)
            if exp_id and exp_id in existing_ids:
                exp_instance = Experience.objects.get(id=exp_id, user_profile=instance)
                exp_instance.companyName = exp_data.get('companyName', exp_instance.companyName)
                exp_instance.position = exp_data.get('position', exp_instance.position)
                exp_instance.dateOfJoining = exp_data.get('dateOfJoining', exp_instance.dateOfJoining)
                exp_instance.dateOfResign = exp_data.get('dateOfResign', exp_instance.dateOfResign)
                exp_instance.save()
            else:
                Experience.objects.create(user_profile=instance, **exp_data)

        # Handle deleting removed experiences
        for exp in instance.experiences.all():
            if exp.id not in [exp_data.get('id', None) for exp_data in experiences_data]:
                exp.delete()

    #     return instance
    
    




#Serializer class is responsible for converting complex data types, such as querysets and model instances, into native Python datatypes that can be easily rendered into JSON, XML, or other content types.
#AddressSerializer: This serializer converts Address model instances to and from JSON.
#  