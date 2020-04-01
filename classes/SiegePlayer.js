const operators = require(`../constants/siegeOperators`);

class SiegePlayer {
    constructor(json) {
        this.name = json.player.p_name;
        this.level = json.stats.level;

        for (const x of operators) {
            if (json.favattacker === x.operatorID) this.favattacker = x.operator;
            if (json.favdefender === x.operatorID) this.favdefender = x.operator;
        }

        this.currentmmr = json.ranked.mmr;
        this.maxmmr = json.ranked.maxmmr;
        this.rankName = json.ranked.rankname;
        this.maxRankName = json.ranked.maxrankname;
        this.rankedKills = json.ranked.allkills;
        this.rankedDeaths = json.ranked.alldeaths;
        this.rankedKD = json.ranked.allkd;
        this.rankedWins = json.ranked.allwins;
        this.rankedLosses = json.ranked.alllosses;
        this.rankedWL = json.ranked.allwl;

        this.color = this.setColor(this.rankName);
        
    }

    setColor(rankName) {
        if (rankName.includes("Copper")) return "#7c2b00"
        else if (rankName.includes("Bronze")) return "#bc773e"
        else if (rankName.includes("Silver")) return "#a6a6a6"
        else if (rankName.includes("Gold")) return "#eeb037"
        else if (rankName.includes("Platinum")) return "#44ccc0"
        else if (rankName.includes("Diamond")) return "#9a7cf4"
        else if (rankName.includes("Champ")) return "#d0066b"
    }
}
module.exports = SiegePlayer;
