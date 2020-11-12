const DEFAULT_COHORT_ID = '0';

function keysIntersection(mapA, mapB) {
    const result = new Set();
    [...mapA.keys()].forEach(key => {
        if (mapB.has(key)) {
            result.add(key);
        }
    });
    return result;
}

function initDomainDefinitions() {
    const result = new Map();
    result.set('adweek.com', new Map());
    result.set('smth.com', new Map());
    result.get('adweek.com').set('business_marketing', 0.24999999999999997);
    result.get('adweek.com').set('entertain_celeb', 0.12857142857142853);
    result.get('adweek.com').set('business_misc', 0.07857142857142856);
    result.get('adweek.com').set('tech_social', 0.06428571428571427);
    result.get('adweek.com').set('shopping_misc', 0.06428571428571427);

    result.get('smth.com').set('business_marketing', 0.24999999999999997);
    result.get('smth.com').set('entertain_celeb', 0.12857142857142853);
    result.get('smth.com').set('business_misc', 0.07857142857142856);
    result.get('smth.com').set('tech_social', 0.06428571428571427);
    result.get('smth.com').set('shopping_misc', 0.06428571428571427);
    //result.get('smth.com').set('health_misc', 0.06428571428571427);
    return result;
}

function initCohortDefinitions() {
    const result = new Map();
    result.set('1', {
        topLevels: ['br.yahoo.com', 'mail.yahoo.com', 'noticias.uol.com.br'],
        cohortContentExist: {
            'politics_misc': 0.1242,
            'sport_soccer': 0.1148,
            'law_misc': 0.1078,
            'entertain_tv': 0.0966,
            'covid19': 0.0823,
            'health_misc': 0.0758,
            'science_environ': 0.0508,
            'sport_misc': 0.0435,
            'sport_athletics': 0.0429,
            'economy_misc': 0.0245,
            'politics_brazilian': 0.0239,
            'science_misc': 0.0234,
            'society_religion': 0.0186,
            'sport_tennis': 0.0144,
            'entertain_music': 0.0125
        }
    });
    result.set('2', {
        topLevels: ['g1.globo.com', 'globoesporte.globo.com', 'oantagonista.com'],
        cohortContentExist: {
            'health_misc': 0.1679,
            'health_specialities': 0.1019,
            'business_misc': 0.0834,
            'covid19': 0.0519,
            'entertain_tv': 0.0443,
            'entertain_movies': 0.0442,
            'tech_computing': 0.0429,
            'entertain_vidgames': 0.0334,
            'health_nutrition': 0.0332,
            'health_digestive': 0.0317,
            'health_diet': 0.0315,
            'shopping_misc': 0.0304,
            'health_exercise': 0.0223,
            'health_musculoskeletal': 0.0208,
            'health_derma': 0.02
        }
    });
    result.set('3', {
        topLevels: ['doctor.webmd.com', 'health.usnews.com', 'medicinenet.com', 'vitals.com', 'webmd.com'],
        cohortContentExist: {
            'entertain_vidgames': 0.3391,
            'tech_social': 0.1855,
            'politics_american': 0.131,
            'entertain_movies': 0.0839,
            'crime': 0.0464,
            'tech_computing': 0.0312,
            'family_children': 0.0297,
            'entertain_music': 0.0224,
            'event_music_festival': 0.013,
            'tech_phones': 0.0082,
            'entertain_tv': 0.0079,
            'home_gardening': 0.0078,
            'entertain_games': 0.0077,
            'entertain_arts': 0.0076,
            'food_misc': 0.0063
        }
    });
    result.set('4', {
        topLevels: ['kotaku.com', 'polygon.com', 'reddit.com'],
        cohortContentExist: {
            'health_misc': 0.1736,
            'health_specialities': 0.0897,
            'covid19': 0.0718,
            'tech_computing': 0.0716,
            'entertain_tv': 0.069,
            'entertain_movies': 0.0659,
            'entertain_vidgames': 0.0557,
            'shopping_misc': 0.0506,
            'health_nutrition': 0.0452,
            'health_diet': 0.0417,
            'health_exercise': 0.0349,
            'health_digestive': 0.0241,
            'health_musculoskeletal': 0.02,
            'fashion_beauty': 0.0189,
            'food_misc': 0.0183
        }
    });
    result.set('5', {
        topLevels: ['doctor.webmd.com', 'health.usnews.com', 'webmd.com'],
        cohortContentExist: {
            'webmail': 0.3333,
            'tech_social': 0.1126,
            'health_misc': 0.0932,
            'covid19': 0.0927,
            'sport_misc': 0.0454,
            'news_and_weather': 0.0446,
            'politics_misc': 0.0295,
            'tech_computing': 0.0275,
            'entertain_tv': 0.022,
            'entertain_celeb': 0.0208,
            'health_alt': 0.0177,
            'science_environ': 0.0176,
            'law_misc': 0.0157,
            'crime': 0.015,
            'family_children': 0.0125
        }
    });
    return result;
}

function getCohortContentByHistory(topLevelDomains, dictionary) {
    // not taking into account time spent
    const groupByContent = topLevelDomains
        .map(item => dictionary.has(item) ? dictionary.get(item) : new Map())
        .reduce((acc, curr) => {
            curr.forEach((value, key) => {
                let valueSum = acc.has(key) ? acc.get(key) : 0.0;
                acc.set(key, valueSum + value);
                return acc;
            });
            return acc;
        }, new Map());

    const cohortContent = new Map();
    if (groupByContent.size !== 0) {
        const sumPercentage = Array.from(groupByContent.entries()).reduce((acc, curr) => acc + curr[1], 0)
        groupByContent.forEach((value, key) => {
            cohortContent.set(key, Math.round(10000 * value / sumPercentage) / 10000);
        });
    }

    return {
        'toplevels': topLevelDomains,
        'cohortContent': cohortContent
    };
}

function getCohortId(cohortContent, cohortDefinitions) {
    const historyContent = cohortContent['cohortContent'];
    if (historyContent.size === 0) {
        return DEFAULT_COHORT_ID;
    }
    const distanceLeft = Math.sqrt(Array.from(historyContent.entries())
        .map(item => item[1] * item[1])
        .reduce((acc, curr) => acc + curr, 0));

    // Find the best-matching user cohort from cohortDefinitions, using the cosine similarity
    const simList = new Map();

    cohortDefinitions.forEach((value, cohortId) => {
        const currentCohortDefinitionMap = new Map(Object.entries(value['cohortContentExist']));
        const intersection = keysIntersection(historyContent, currentCohortDefinitionMap);

        const crossProduct = [...intersection]
            .map(key => historyContent.get(key) * currentCohortDefinitionMap.get(key))
            .reduce((acc, curr) => acc + curr, 0);

        const distanceRight = Math.sqrt(Array.from(currentCohortDefinitionMap.entries())
            .map(item => item[1] * item[1])
            .reduce((acc, curr) => acc + curr, 0)
        );

        simList.set(cohortId, Math.round(crossProduct / (distanceLeft * distanceRight) * 100) / 100);
    });

    if (simList.size === 0) {
        return DEFAULT_COHORT_ID;
    }

    const cohort = [...simList.entries()].reduce((acc, curr) => curr[1] > acc[1] ? curr : acc);
    return cohort[0];
}

function getDomain(url) {
    const parsed = new URL(url);
    return parsed.hostname;
}

function getTopLevelDomains(history) {
    return history.map(item => getDomain(item));
}

if (ProprietaryCohorts) {
    ProprietaryCohorts.domainDefinitions = initDomainDefinitions();
    ProprietaryCohorts.cohortDefinitions = initCohortDefinitions();

    ProprietaryCohorts.classifier = function (url, state) {
        if (typeof state !== 'object') {
            console.log('state is not an object')
            return;
        }

        if (!Array.isArray(state.history)) {
            state.history = [];
        }

        state.history = [
            'http://addweek.com/',
            'http://test.com?param=true',
            'http://smth.com'
        ];
        state.history.push(url);

        const topLevel = getTopLevelDomains(state.history);
        console.log(`Top levels: ${topLevel}`);
        const historyCohortContent = getCohortContentByHistory(topLevel, ProprietaryCohorts.domainDefinitions);
        state.cohortId = getCohortId(historyCohortContent, ProprietaryCohorts.cohortDefinitions);
        console.log(`Cohort: ${state.cohortId}`);
        return state.cohortId;
    }

}
