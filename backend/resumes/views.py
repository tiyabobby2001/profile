from django.shortcuts import render

from rest_framework import viewsets
from .models import Resume
from .serializers import ResumeSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status



class ResumeViewSet(viewsets.ModelViewSet):  # create, retrieve, update, and delete. ModelViewSet is  a                                  special type of viewset that includes all these actions.
    queryset = Resume.objects.all()      # queryset is the set of objects that the viewset will operate
    serializer_class = ResumeSerializer
    # @api_view(['PUT'])
    # def update_resume(request, pk):
    #     try:
    #         resume = Resume.objects.get(pk=pk)
    #     except Resume.DoesNotExist:
    #         return Response(status=status.HTTP_404_NOT_FOUND)
        
    #     serializer = ResumeSerializer(resume, data=request.data, partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
