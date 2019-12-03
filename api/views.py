from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.helpers import preprocess, process
from api.models import Word

@api_view(['POST'])
def index(request):
    if request.method == 'POST':
        text = request.data["text"]
        paragraphs = preprocess(text)
        for paragraph in paragraphs:
            process(paragraph)
        return Response({"message": "success", "paragraphs": paragraphs})
    
    return Response({"message": "default response"})

@api_view(['GET'])
def word_list(request):
    print("Words: ")
    return Response({"message": "default response"})


