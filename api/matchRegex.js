export default async function handler(req, res) {
    // Verifica se o método é POST
    if (req.method === 'POST') {
      // Garante que o corpo da requisição seja tratado como JSON
      let body;
      try {
        // Usa buffer para capturar a requisição completa
        body = JSON.parse(req.body);
      } catch (error) {
        return res.status(400).json({ message: "Invalid JSON body", error: error.message });
      }
  
      const { text, pattern } = body;
  
      if (!text || !pattern) {
        return res.status(400).json({ message: "Missing 'text' or 'pattern' in request body" });
      }
  
      try {
        const regex = new RegExp(pattern, 'g'); // Adiciona o flag 'g' para múltiplos matches
        const matches = [...text.match(regex)];
  
        const result = matches.map(match => ({
          match: match[0],
          captures: match.slice(1),
        }));
  
        res.status(200).json({ matches: result });
      } catch (error) {
        res.status(500).json({ message: 'Invalid regular expression', error: error.message });
      }
    } else {
      res.status(405).json({ message: 'Only POST requests are allowed' });
    }
  }
  