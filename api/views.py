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
    return Response({"message": [word.text for word in Word.objects.all()]})

@api_view(['POST'])
def search(request):
	if (request.method == 'POST'):
		word = request.data['word'].strip()
		paragraphs = []
		try:
			wordObj = Word.objects.get(text=word)
			paragraphs = wordObj.paragraphs.all()[:10]
		except:
			pass
		return Response({"paragraphs": [paragraph.text for paragraph in paragraphs]})
	return Response({"message": "default response"})


