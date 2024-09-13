import re
import json

def handler(event, context):
    # Verifica se o método é POST
    if event['httpMethod'] != 'POST':
        return {
            'statusCode': 405,
            'body': json.dumps({'message': 'Only POST requests are allowed'})
        }

    try:
        # Parse do body da requisição
        body = json.loads(event['body'])
        text = body.get('text')
        pattern = body.get('pattern')

        if not text or not pattern:
            return {
                'statusCode': 400,
                'body': json.dumps({"message": "Missing 'text' or 'pattern' in request body"})
            }

        # Expressão regular para encontrar os matches
        regex = re.compile(pattern)
        matches = list(regex.finditer(text))

        result = []
        for match in matches:
            result.append({
                'match': match.group(0),
                'captures': match.groups()
            })

        return {
            'statusCode': 200,
            'body': json.dumps({"matches": result})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'An error occurred', 'error': str(e)})
        }
