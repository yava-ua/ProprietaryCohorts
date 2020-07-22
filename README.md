# Proprietary Cohorts

## Introduction

Today, online advertising systems rely on 3rd party cookies, which store the cross-publisher IDs, to group users into audience segments or cohorts using sophisticated algorithms based on their browsing behavior. Marketers use these cohorts to match advertising content to the users who are likely to be the most receptive. They are then able to record which users, and cohorts, generated better marketer success metrics (e.g., visited the marketer website, purchased the marketer’s product) to determine how to adjust their budgeting and targeting of future content.

The ultimate goal of this system provides benefits for everyone involved. Users get to see fewer and more relevant ads, advertisers get to reach more responsive people, and the measured effectiveness enables marketers to shift more budget to the publishers frequented by this audience, This in turn more effectively monetizes their content.

However, the use of individual user ids across page domains, made possible by 3rd party cookies comes at a cost; it allows for uncomfortable sharing of a users’ browsing habits with marketers, and of marketer-defined user interests and potential buying habits with publishers.

This proposal suggests a solution that will enable proprietary grouping of users into cohorts based on their browsing behavior in a way that addresses both marketer needs as well as the privacy and security concerns of sharing data with non-permissioned recipients. Equally important, this document looks to provide a workable alternative to encapsulating all decisioning in the browser (like Turtledove) or requiring a centralized governing body to make decisions on what is or is not allowed (like Sparrow). If properly architected, the defined communications protocol between browser and “cohort provider” can achieve the twin goals of removing decision-making within centralized nodes (either browser or gatekeeper) and also allows an open, competitive marketplace of organizations to serve as cohort providers. 

## API Example Flow

A website (news-publisher.example) who chooses to utilize proprietary cohorts adds a new html tag to the page header:

```
<link rel="cohort-register" href="https://cohort-provider.example/register">
```

A supporting browser reads this tag and executes a request to `https://cohort-provider.example/register?cohortRegistrationId=12345&domain=news-publisher.example` where `12345` is a unique identifier generated by the browser included on all cohort registration requests across domains to this provider. 

The cohort provider records this cohortRegistrationId and domain to build a proprietary graph of browserIds and behaviors and returns a cohort ID to the browser.

```
{
    cohortID: abcd
}
```

The browser stores this cohortId for eligible users and makes it available to the publisher via a JS API.

```
navigator.getCohortId();
```

Publishers could use this Cohort ID both for internal analytics purposes and forward it to marketers in ad requests. Marketers could use this Cohort ID to identify which cohorts are engaging most with their brand and could allocate more budget to publishers who attract users in this cohort to their properties.

This system would provide for the needed advertising functionality of both publishers and buyers while protecting users’ privacy.

## Design Elements

### Cohort Provider Registration ID

The Cohort Provider Registration ID is client and provider specific value generated on the client (browser) and available only via the cohort registration. Calls to the same cohort provider across websites will include the same cohort registration id from a given client. Calls to different cohort providers will use different cohort provider registration IDs per cohort provider.

Clients will automatically reset cohort provider registration IDs periodically to enhance privacy (at least every 30 days, but perhaps more frequently).

Users can manually clear their cohort (which will effectively reset cohort registration ids) at any time.

### Registration Request

The cohort registration request will be initiated by the client sometime after it encounters the cohort registration tag. The request will only include the cohort provider registration id and the website domain. No cookies, caching or other stateful mechanisms will be used in the request.

The browser may delay the registration call in order to prevent correlation with other page requests.

The browser may relay the registration request through a proxy to hide the IP address of the user.

The browser may ensure a minimum number of users have visited a given domain before initiating the registration request.

### Cohort IDs

A cohort ID indicates which cohort a client belongs to. In order to ensure these IDs are not used to identify a unique user, the client can ensure a cohort ID has a minimum number of users before allowing it access in the browser.

### Header Tag

The header tag is used to indicate a given publisher page is opting in to sharing page-load information with a cohort provider as well as indicating which cohort provider they are choosing to work with.

This opt-in / registration could also be done as a javascript API. Something like:

```
navigator.registerCohort("https://cohort-provider.example/register");
```

### Cohort Provider

The cohort provider can be any entity. It is responsible for grouping Cohort Provider Registration IDs based on their browsing behavior and returning Cohort IDs to the browser.

Cohort providers never receive any requests including user identifiable information along with the cohort registration id to prevent any correlation between user identity and cohort registration ID.

## Information available to each party

### Webpage

The hypertext document a user is viewing. The webpage must opt-in to sharing page-view information with a Cohort Provider by including a cohort registration header tag.

Within the scope of this proposal, the only information provided to the website is a CohortId.

This proposal does not make a technical distinction between a Publisher and a Marketer/Advertiser, all webpages are treated the equally.

### Cohort Provider

The Cohort Provider is any entity who provides a cohort ID to a web page via a Cohort Registration Request.

Within the scope of this proposal, the only information provided to a Cohort Provider is a client-specific, short-lived `Cohort Provider Registration ID` that is unique to the cohort provider, and some relatively small amount of information (with k-anonymity) about a pageview (i.e. domain-name).

The Cohort Provider can build a database of pageviews for each `Cohort Registration ID`, but should not be able to join that ID or any information collected with any external information about the user.


## Benefits

* People who like ads that remind them of sites they're interested in can choose to keep seeing those sorts of ads.
* People who don't like these types of ads can choose to stop sending their current (or any) cohort signal.
* Advertisers cannot learn the browsing habits of specific people, even those who have joined multiple interest groups.
* Publishers learn only the single cohortId of the people who visit them (much like FLoC).
* Marketers can retain campaign control and performance in so far as this does not infringe user privacy.
* Appropriate control over ad safety, brand safety and transparency in billing is provided to both advertisers and publishers.
* User experience while browsing the web is preserved.
* Publishers and Marketers have an open market choice of who provides the best cohort solution for their individual needs. 

## Trade Offs

### Registration Request Delay

It is important to disassociate the cohort registration request from the page load to prevent joining first party ids with the cohort provider registration id. However, the greater the delay in making information available to the cohort provider, the less valuable the information is and the less effective and useful the system will be. The delay should therefore be as short as possible to provide the needed privacy.

### Minimum Cohort Membership Size

Cohort membership size must be large enough to protect the privacy of each member. However, a system with smaller, more granular cohorts is more flexible and can provide more value to marketers.

### Registration Request Proxying

User IP address has unfortunately been widely used for fingerprinting. Proxying all cohort registration requests will go a long way to preventing the cohort provider from being able to fingerprint the user and match them with some first party identifier. However, IP address has been used for low resolution geographic positioning, which can provide useful information when grouping users into cohorts and targeting them for marketing purposes. If clients choose to proxy requests, they should provide as-granular-as-possible geo information via request parameters to cohort provider.

## Privacy and Security Considerations

This proposal shared many of the privacy concerns as FLoC. 

### Revealing People’s Interests to the Web

This API democratizes access to some information about an individual’s browsing history on any site that opts into the same cohort provider. This is in contrast to today’s world, in which cookies or other tracking techniques may be used to collate someone’s browsing activity across many sites and potentially tie that information to a user’s PII.

However, sites that know a person’s PII (e.g., when people sign in using their email address) could record and reveal their Cohort ID. This means that information about an individual's interests may eventually become public. This is not ideal, but still better than today’s situation in which PII can be joined to exact browsing history obtained via third-party cookies.

As such, there will be people for whom providing this information in exchange for funding the web ecosystem is an unacceptable trade-off. Whether or not the browser sends a Cohort ID is user controllable.

### Tracking people via their Cohort ID

A Cohort ID could be used as a user identifier. It may not have enough bits of information to individually identify someone, but in combination with other information (such as an IP address), it might. One design mitigation is to ensure Cohort ID sizes are large enough that they are not useful for tracking. The Privacy Budget explainer points towards another relevant tool that Cohort IDs could be constrained by.

### Sensitive Categories

A Cohort ID might reveal sensitive information. As a first mitigation, the client could remove sensitive sites from its data collection. But this does not mean sensitive information can’t be leaked. Some people are sensitive to categories that others are not, and there is no globally accepted notion of sensitive sites.

It should be clear that usage of Cohort IDs will never be able to prevent all misuse. There will be information that is sensitive in contexts that weren't predicted. Beyond Proprietary Cohort’s technical means of preventing abuse, sites that use Cohort IDs will need to ensure that people are treated fairly, just as they must with algorithmic decisions made based on any other data today.

## Extensions

### Multiple Providers
a single first party (domain or set) could send data to multiple providers, but can only receive a cohort from one. This will enable advertisers to provide info that can enable effective ads on publishers that might use different cohort providers but prevent the joining of cohort ids to a single first party id for fingerprinting purposes.

### Contextual Data
Only providing domain in the cohort registration request leaves a large amount of very useful information on the table. For example, a marketer would be interested in targeting users who have added something to their shopping cart but not checked out, or perhaps users who have already purchased a product on their site.

The cohort registration request could be extended to include the full url (or a larger portion thereof) rather than simply the domain to enrich the available data for that page view as long as the risk for fingerprinting is low (think privacy budget). Exact mechanism for controlling the granularity of information needs to be worked out, but here are some options:
* Client uses some aggregate page view service to ensure all reported urls have a minimum unique visitor count
* Publishers publish a list of valid urls once a day (that is limited to lets say 100). Browsers only include url in cohort registration if url is on the list. Clients could proxy requests for this list with caching to eliminate the possibility of using a different list with different users (and use this to correlate users and history).

This problem has some parallels to the link decoration problem which is being discussed in the Privacy CG.

## Open Questions

* The following three questions assume that if marketers do not receive the capabilities to reduce “media waste” by having less effective content matching they will pay publishers less, which would thus reduce publisher revenues. Thus ensuring these are either addressed or the relative impact to publisher revenues is called out would be helpful (even if the impact would be less than proposed by other specifications). 
  * How do marketers and publishers analyze and understand what are the best activity-based rules to assign “eligible” people to cohorts? 
    * A cohort provider, rather than an individual marketer or publisher, determines the rule-sets that define eligibility. Thus, there would be some impact to marketer value and publisher revenue relative to alternate mechanisms.
  * How do marketers and publishers analyze and understand what is the unique unduplicated reach across different publishers for the same cohort? 
    * A cohort provider could identify unique reach (at least in terms of cohort provider registration ids) across publishers (perhaps publishing an estimated unique user count per cohort and/or per cohort-domain). This provides superior value relative to the proposed turtledove mechanism, which does not provide for calculations of unique reach.
  * How do marketers and publishers achieve cross-publisher frequency capping if the limit on the number of cohorts is less than the number of ads a user is exposed to?
    * Given the scale restrictions on cohorts, this proposal does not address cross-publisher frequency capping. Thus, there would be some impact to marketer value and publisher revenue relative to alternate mechanisms.
    
## Related Proposals
* [FLoC](https://github.com/jkarlin/floc)
* [SPARROW](https://github.com/WICG/sparrow)
* [TURTLEDOVE](https://github.com/WICG/turtledove)
