export default async function handler(req, res) {
    const url = `https://www.omdbapi.com/?s=${req.query.search}&apikey=${process.env.API_KEY}`;
    console.log(url)
    await fetch(url)
        .then(response => response.json())
        .then(json => {
            res.status(200).json(json);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error });
        });
  }