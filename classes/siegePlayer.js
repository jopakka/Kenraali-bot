const operators = require("../constants.js").siegeOperators;

class SiegePlayer {
    constructor(json) {
        const regions = ["NA", "EU", "AS"];
        const times = [new Date(json.ranked.NA_updatedon).valueOf(), new Date(json.ranked.EU_updatedon).valueOf(), new Date(json.ranked.AS_updatedon).valueOf()];

        const mmr = regions[times.indexOf(Math.max.apply(null, times))] + "_mmr";

        this.name = json.p_name;
        this.userId = json.p_user;
        this.level = json.p_level;
        this.updated = (json.updatedon).replace(/[</u>]/g, "");

        for (const x of operators) {
            if (json.favattacker === x.operatorID) {
                this.favattacker = x.operator;
            }
            if (json.favdefender === x.operatorID) {
                this.favdefender = x.operator;
            }
        }

        const pdata = JSON.parse(json.p_data);

        this.currentmmr = json.ranked[mmr];
        this.maxmmr = json.ranked.maxmmr;
        this.rankedKills = pdata[1];
        this.rankedDeaths = pdata[2];
        this.rankedKD = Math.round(((pdata[1] / pdata[2]) + Number.EPSILON) * 100) / 100
        this.rankedWins = pdata[3];
        this.rankedLoses = pdata[4];
        this.rankedWL = Math.round(((pdata[3] / pdata[4]) + Number.EPSILON) * 100) / 100
        this.shotsFired = pdata[16];

    }
}
module.exports = SiegePlayer;