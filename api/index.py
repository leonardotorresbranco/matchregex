from flask import Flask, request, jsonify
import re

app = Flask(__name__)

@app.route('/api/match_regex', methods=['POST'])
def match_regex():
    try:
        data = request.get_json()
        print(data)
        text = data.get('text')
        pattern = data.get('pattern')

        if not text or not pattern:
            return jsonify({"message": "Missing 'text' or 'pattern' in request body"}), 400

        # Expressão regular para encontrar os matches
        regex = re.compile(pattern)
        matches = list(regex.finditer(text))

        result = []
        for match in matches:
            result.append({
                'match': match.group(0),
                'captures': match.groups()
            })

        return jsonify({"matches": result}), 200

    except Exception as e:
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500

# Essa linha é necessária para rodar o app localmente
if __name__ == '__main__':
    app.run(debug=True)
