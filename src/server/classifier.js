const DEFAULT_COHORT_ID = '0000';

function getCohortContentByHistory(topLevelDomains, dictionary) {
    // not taking into account time spent
    const result = {
        'toplevels': topLevelDomains,
        'cohortContent': new Map()
    };

    // recalculate cohortContent based on topLevel history

    // topLevelDomains.forEach(domain => {
    //     if (dictionary.has(domain)) {
    //         history.set(domain, dictionary.get(domain))
    //     }
    // });
    // returns something like
    // {
    //     'toplevels': topLevelDomains,
    //     'cohortContent': { 'food_misc': 0.500, 'covid19': 0.1575 }
    // }
    return history;
}

function getCohortId(cohortContent, cohortDefinitions) {
    // Find the best-matching user cohort from cohortDefinitions, using the cosine similarity

    // calculate Mahalanobis distance;

    return DEFAULT_COHORT_ID;
}

function getDomain(url) {
    let result = url.replace(/(https?:\/\/)?(www.)?/i, '');
    result = result.split('.');
    result = result.slice(url.length - 2).join('.');

    if (result.indexOf('/') !== -1) {
        return result.split('/')[0];
    }
    return result;
}

function getTopLevelDomains(history) {
    return history.map(item => getDomain(item));
}

if (ProprietaryCohorts) {
    ProprietaryCohorts.domainDefinitions = {
        'adweek.com': {
            'business_marketing': 0.24999999999999997,
            'entertain_celeb': 0.12857142857142853,
            'business_misc': 0.07857142857142856,
            'tech_social': 0.06428571428571427,
            'shopping_misc': 0.06428571428571427
        },

        'smth.com': {
            'business_marketing': 0.24999999999999997,
            'entertain_celeb': 0.12857142857142853,
            'business_misc': 0.07857142857142856,
            'tech_social': 0.06428571428571427,
            'shopping_misc': 0.06428571428571427
        },
    }

    ProprietaryCohorts.cohortDefinitions = {
        1: {
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
        },
        2: {
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
        },
        3: {
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
        },
        4: {
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
        },
        5: {
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
        },
        6: {
            topLevels: ['currently.att.yahoo.com', 'mail.yahoo.com', 'msn.com'],
            cohortContentExist: {
                'home_property': 0.2094,
                'business_careers': 0.1443,
                'shopping_misc': 0.1045,
                'auto_misc': 0.097,
                'tech_phones': 0.0487,
                'home_interiors': 0.0482,
                'auto_motorbikes': 0.0336,
                'entertain_books': 0.0287,
                'business_energy': 0.026,
                'food_misc': 0.0249,
                'fashion_women': 0.0231,
                'auto_4wd': 0.0201,
                'home_pets': 0.0156,
                'food_kitchen': 0.0143,
                'fashion_misc': 0.0128
            }
        },
        7: {
            topLevels: ['currently.att.yahoo.com', 'mail.yahoo.com', 'msn.com'],
            cohortContentExist: {
                'entertain_tv': 0.1985,
                'covid19': 0.1084,
                'shopping_misc': 0.0971,
                'sport_cycling': 0.0969,
                'health_misc': 0.0943,
                'sport_soccer': 0.0651,
                'politics_american': 0.0486,
                'politics_brazilian': 0.0485,
                'law_misc': 0.028,
                'science_misc': 0.0271,
                'politics_misc': 0.0139,
                'food_misc': 0.0115,
                'entertain_celeb': 0.011,
                'event_copa_america': 0.0107,
                'auto_misc': 0.0101
            }
        },
        8: {
            topLevels: ['mg.olx.com.br', 'pe.olx.com.br', 'rj.olx.com.br', 'sp.olx.com.br'],
            cohortContentExist: {
                'politics_misc': 0.1013,
                'law_misc': 0.0896,
                'health_misc': 0.0825,
                'covid19': 0.0662,
                'entertain_tv': 0.0649,
                'adult': 0.0632,
                'politics_american': 0.0628,
                'crime': 0.0557,
                'entertain_celeb': 0.0475,
                'news_and_weather': 0.0392,
                'arms': 0.0389,
                'travel_holidays': 0.0348,
                'sport_soccer': 0.0348,
                'society_misc': 0.0308,
                'business_misc': 0.0251
            }
        },
        9: {
            topLevels: ['epoca.globo.com', 'globo.com', 'uol.com.br'],
            cohortContentExist: {
                'health_misc': 0.1203,
                'covid19': 0.0965,
                'politics_misc': 0.0937,
                'tech_social': 0.0925,
                'politics_american': 0.0856,
                'economy_markets': 0.0821,
                'law_misc': 0.0382,
                'news_and_weather': 0.0351,
                'society_religion': 0.0287,
                'crime': 0.0264,
                'tech_computing': 0.0247,
                'science_environ': 0.0185,
                'society_misc': 0.0178,
                'entertain_celeb': 0.017,
                'business_management': 0.0166
            }
        },
        10: {
            topLevels: ['cnn.com', 'foxnews.com', 'tmz.com'],
            cohortContentExist: {
                'shopping_misc': 0.127,
                'health_misc': 0.1178,
                'covid19': 0.1174,
                'tech_social': 0.1128,
                'science_misc': 0.1108,
                'politics_american': 0.109,
                'news_and_weather': 0.0447,
                'tech_computing': 0.0335,
                'entertain_celeb': 0.0203,
                'science_environ': 0.0202,
                'health_alt': 0.0178,
                'sport_misc': 0.0084,
                'politics_misc': 0.0081,
                'fashion_misc': 0.0072,
                'entertain_music': 0.0056
            }
        },
        11: {
            topLevels: ['finance.yahoo.com', 'msn.com', 'news.yahoo.com', 'yahoo.com'],
            cohortContentExist: {
                'entertain_vidgames': 0.2124,
                'entertain_games': 0.2001,
                'tech_computing': 0.1479,
                'home_interiors': 0.0948,
                'education_misc': 0.074,
                'crime': 0.0281,
                'tech_phones': 0.0199,
                'arms': 0.0159,
                'food_misc': 0.0158,
                'fashion_misc': 0.0152,
                'military': 0.0145,
                'sport_extreme': 0.0138,
                'auto_misc': 0.0122,
                'science_space': 0.0099,
                'science_environ': 0.0097
            }
        }
    }

    ProprietaryCohorts.classifier = function (url, state) {
        if (typeof state !== 'object') {
            console.log('state is not an object')
            return;
        }

        if (!Array.isArray(state.history)) {
            state.history = [];
        }
        state.history.push(url);

        const topLevel = getTopLevelDomains(state.history);
        const historyCohortContent = getCohortContentByHistory(topLevel, ProprietaryCohorts.domainDefinitions);

        const cohortId = getCohortId(historyCohortContent, ProprietaryCohorts.cohortDefinitions);
        state.cohortId = cohortId !== null ? cohortId : DEFAULT_COHORT_ID;

        console.log(state);
        return state.cohortId;
    }

}
