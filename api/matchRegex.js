export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      console.log(req.body);
      // Parse manual do body para JSON
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { text, pattern } = body;

      if (!text || !pattern) {
        return res.status(400).json({ message: "Missing 'text' or 'pattern' in request body" });
      }

      const regex = new RegExp(pattern);
      const matches = [...text.match(regex)];

      const result = matches.map(match => ({
        match: match[0],
        captures: match.slice(1),
      }));

      res.status(200).json({ matches: result });
    } catch (error) {
      res.status(500).json({ message: 'Invalid regular expression or body parsing error', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed' });
  }
}
