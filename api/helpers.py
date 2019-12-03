from api.models import Paragraph, Word
from django.db import transaction


def preprocess(text):
	text = text.lower().replace('.',' ').replace(',',' ').replace('-',' ').replace('-',' ').replace('  ', ' ')
	paragraphs = text.split('\n')

	return paragraphs

@transaction.atomic
def process(paragraph):
	words = paragraph.strip().split(' ')
	paragraphObj = Paragraph.objects.create(text=paragraph)
	paragraphObj.save()
	for word in words:
		word = word.strip()
		wordObj, created = Word.objects.get_or_create(text=word)
		wordObj.save()
		wordObj.paragraphs.add(paragraphObj)
