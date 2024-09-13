export default async function handler(req, res) {
    // Verifica se o método é POST
    if (req.method === 'POST') {
      try {
        const { text, pattern } = req.body; // O middleware já faz o parsing automático do JSON
  
        if (!text || !pattern) {
          return res.status(400).json({ message: "Missing 'text' or 'pattern' in request body" });
        }
  
        const regex = new RegExp(pattern); // Adiciona o flag 'g' para múltiplos matches
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
  