const Service = require('../models/Service');

const getAverageScore = (reviewsList = []) => {
    const scoresList = reviewsList.map(e => e.score);
    const serviceOverallScoreSum = scoresList.length !== 0 ?
        scoresList.reduce((previousValue, currentValue) => previousValue + currentValue) : 0;
    return Math.round(serviceOverallScoreSum / reviewsList.length)
}

const getSortKeyValue = sortCriteria => {
    switch (sortCriteria) {
        case "price_high_to_low":
            return { key: "price", value: "desc" };
        case "price_low_to_high":
            return { key: "price", value: "asc" };
        case "most_recents_first":
            return { key: "createdAt", value: "desc" };
        case "most_recents_last":
            return { key: "createdAt", value: "asc" };
        default:
            return { key: "createdAt", value: "desc" };
    }
}

module.exports.search_get = async (req, res) => {
    const {
        searchTerm,
        location = "",
        sortCriteria = "",
        perPage = "10",
        page = "0"
    } = req.query;

    try {
        const { key, value } = getSortKeyValue(sortCriteria);
        let sortObj = {};
        sortObj[key] = value;

        const servicesList = await Service.find(
            {
                title: { "$regex": searchTerm, "$options": "i" },
                active: true,
                $or: [
                    { "address.country": { "$regex": location, "$options": "i" } },
                    { "address.city": { "$regex": location, "$options": "i" } }
                ]
            },
            '_id title imagesList.imageURL price currency priceCalculationType address.city address.country reviewsList.score createdAt')
            .limit(Number(perPage))
            .skip(Number(perPage) * Number(page))
            .sort(sortObj)
            .exec();

        const result = [];
        servicesList.forEach(service => {
            result.push({
                serviceId: service._id,
                image: service.imagesList[0].imageURL,
                title: service.title,
                price: service.price,
                currency: service.currency,
                priceCalculationType: service.priceCalculationType,
                city: service.address.city,
                country: service.address.country,
                overallScore: getAverageScore(service.reviewsList),
                createdAt: service.createdAt
            })
        });

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }


}