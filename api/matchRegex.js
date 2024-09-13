
export default function handler(req, res) {
    if (req.method === 'POST') {

        log(req);

        const { text, pattern } = req.body;
  
      if (!text || !pattern) {
        return res.status(400).json({ message: "Missing 'text' or 'pattern' in request body" });
      }
  
      try {
        const regex = new RegExp(pattern);
        const matches = [...text.match(regex)];
  
        // Formata o resultado: cada item terá o match e as capturas
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
  