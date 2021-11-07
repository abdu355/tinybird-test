import getQueryParamURL from '@utils/getQueryParamURL'

const token = process.env.NEXT_PUBLIC_TINYBIRD_ADMIN_TOKEN
export default async function handler(req, res) {
    const { pipe } = req.query
    let params = { ...JSON.parse(req.body), token: token }
    let tinyRes = await fetch(getQueryParamURL(`https://api.tinybird.co/v0/pipes/${pipe}`, params))
    let result = await tinyRes.json()
    res.status(200).json({ data: result.data, stats: result.statistics })
}