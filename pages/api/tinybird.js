export default async function handler(req, res) {
    let { pipe, token, page_size } = JSON.parse(req.body)
    let tinyRes = await fetch(`https://api.tinybird.co/v0/pipes/${pipe}?token=${token}&page_size=${page_size}`)
    let result = await tinyRes.json()
    res.status(200).json({ data: result.data, stats: result.statistics })
}