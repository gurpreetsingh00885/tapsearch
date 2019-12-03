from api.models import Paragraph, Word

def preprocess(text):
	text = text.lower().replace('.',' ').replace(',',' ').replace('-',' ').replace('-',' ').replace('  ', ' ')
	paragraphs = text.split('\n')

	return paragraphs

def process(paragraph):
	words = paragraph.strip().split(' ')
	paragraphObj = Paragraph.objects.create(text=paragraph)
	paragraphObj.save()
	for word in words:
		word = word.strip()
		wordObj, created = Word.objects.get_or_create(text=word)
		wordObj.save()
		wordObj.paragraphs.add(paragraphObj)
