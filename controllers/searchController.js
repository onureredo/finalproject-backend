const Service = require('../models/Service');

const getSortObject = sortCriteria => {
    let sortObj = {};
    // default most_recents_first
    let key = "createdAt";
    let value = "desc";

    switch (sortCriteria) {
        case "price_high_to_low":
            key = "price";
            break;
        case "price_low_to_high":
            key = "price";
            value = "asc";
            break;
        case "most_recents_last":
            value = "asc";
            break;
        case "score_high_to_low":
            key = "overallScore";
            break;
        case "score_low_to_high":
            key = "overallScore";
            value = "asc";
            break;
    }
    sortObj[key] = value;
    return sortObj;
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
        const sortObj = getSortObject(sortCriteria);
        const servicesList = await Service.find(
            {
                title: { "$regex": searchTerm, "$options": "i" },
                active: true,
                $or: [
                    { "address.country": { "$regex": location, "$options": "i" } },
                    { "address.city": { "$regex": location, "$options": "i" } }
                ]
            },
            '_id title imagesList.imageURL price currency priceCalculationType address.city address.country overallScore reviewsList.score createdAt')
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
                overallScore: service.overallScore,
                createdAt: service.createdAt
            })
        });

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }

}