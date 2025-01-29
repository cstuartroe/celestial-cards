import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  range,
  NewDate,
  GregorianDate,
  gregorianDateToNewDate,
  FIRST_YEAR,
  CONSTELLATIONS,
  dayAndYearToJSX, ordinal, CYCLE_LENGTH, AGE_LENGTH, gregorianYearWithEra,
} from "./utils";

export function   dateTable(startDate: GregorianDate, days: number, skipCondition: (d: NewDate) => boolean) {
  return (
      <div className='container-fluid'>
        {range(days).map(n => {
          let date = startDate.daysAfter(n);
          let newDate = gregorianDateToNewDate(date);

          if (skipCondition(newDate)) {
            return null
          }

          return <div key={n} className='row' style={{padding: 0}}>
            <div className="col-5">
              <p style={{textAlign: 'right'}}>
                {date.toString()}
              </p>
            </div>
            <div className="col-7">
              <p>
                {dayAndYearToJSX(newDate)}
              </p>
            </div>
          </div>
        })
        }
      </div>
  );
}

export default class NewCalendarExplanation extends Component<{}, {}> {
  render() {
    return (
      <div className={'calendar-style'}>
        <div className='container-fluid explanation'>
          <div className='row'>
            <div className='col-0 col-sm-1 col-md-2 col-lg-3'/>
            <div className='col-12 col-sm-10 col-md-8 col-lg-6'>
              <h2 className='heading'>So what's up with this funky calendar?</h2>
              <p style={{textAlign: 'center'}}>
                <Link to={'/calendar'}>back to calendar</Link>
              </p>

              <p>
                This calendar has no particular applications or goals other than aesthetic engagement with the way
                ancient societies conceived of time and the universe - an attempt to create a unique "ancient"
                timekeeping
                and cosmological transition that doesn't look out of place alongside the real traditions of the world.
                I originally intended it to be fairly universalist and culturally non-specific, although the particulars
                of
                it have ended up being largely inspired by the traditions of temperate Eurasia, particularly Chinese and
                Celtic.
                The major way in which it differs from, e.g., Mediterranean and South Asian tradition is in centering
                four seasons on the solstices and equinoxes
                (so-called <a href="https://en.wikipedia.org/wiki/Season#Solar">solar seasonal reckoning</a>)
                and dividing the year accordingly, rather than using the solstices and equinoxes as dividing lines
                themselves.
              </p>

              <p>
                It also interfaces well with celestial cards; it divides the year into 60 six-day weeks, with each week
                corresponding to one card in the deck. This means, incidentally, that everyone's birthday can be
                associated
                with a card in the deck: <Link to={'/calendar/birthday'}>try it for yourself</Link>!
              </p>

              <p>
                This calendar is an evolution
                of <a href="https://conorstuartroe.com/new_calendar" target="_blank">an earlier project</a>,
                although many fundamental modifications have been made. I've been tinkering with calendrics since 2016.
              </p>

              <p>
                Note! as much as it may appear to be that sort of thing, this is not intended to actually advance
                any kind of astrological or divinatory ideas; it's basically just a conculturing project.
              </p>

              <h3>Elements</h3>

              <p>
                I've always found it kind of endearing how obsessed
                most pre-modern peoples were with correlating sets of things - elements, metals, planets, colors,
                directions,
                units of time, etc. Consider, for example, the associations made with the Chinese paradigm of five
                elements (五行 <i>wǔxíng</i>):
              </p>

              <table>
                <thead>
                <tr>
                  <td>Metal</td>
                  <td>Fire</td>
                  <td>Wood</td>
                  <td>Water</td>
                  <td>Earth</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>White</td>
                  <td>Red</td>
                  <td>
                    <a href="https://en.wikipedia.org/wiki/Blue%E2%80%93green_distinction_in_language#East_Asian_languages"
                       target="_blank">
                      Grue
                    </a>
                  </td>
                  <td>Black</td>
                  <td>Yellow</td>
                </tr>
                <tr>
                  <td>Venus</td>
                  <td>Mars</td>
                  <td>Jupiter</td>
                  <td>Mercury</td>
                  <td>Saturn</td>
                </tr>
                <tr>
                  <td>West</td>
                  <td>South</td>
                  <td>East</td>
                  <td>North</td>
                  <td>Center</td>
                </tr>
                <tr>
                  <td>Autumn</td>
                  <td>Summer</td>
                  <td>Spring</td>
                  <td>Winter</td>
                  <td>transitions</td>
                </tr>
                <tr>
                  <td>Friday</td>
                  <td>Tuesday</td>
                  <td>Thursday</td>
                  <td>Wednesday</td>
                  <td>Saturday</td>
                </tr>
                </tbody>
              </table>

              <p>
                In Western tradition, there are four elements - water, fire, earth, air - with their own sets of
                similar associations which I won't list here. Similarly, in many other Asian and Subsaharan African
                traditions there are five: water, fire, earth, air, and void/aether.
              </p>

              <p>
                I've always been partial to a conception of six elements, a union of the Western and Chinese sets,
                arranged as three pairs of opposites - earth, air; fire, water; wood/plants, metal - with the following
                set of associations (further explanation below):
              </p>

              <table>
                <thead>
                <tr>
                  <td>Air</td>
                  <td>Earth</td>
                  <td>Fire</td>
                  <td>Water</td>
                  <td>Wood</td>
                  <td>Metal</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>White</td>
                  <td>Black</td>
                  <td>Yellow</td>
                  <td>Blue</td>
                  <td>Green</td>
                  <td>Red</td>
                </tr>
                <tr>
                  <td>Sky/space</td>
                  <td>Saturn</td>
                  <td>Venus</td>
                  <td>Mercury</td>
                  <td>Jupiter</td>
                  <td>Mars</td>
                </tr>
                <tr>
                  <td>Moon</td>
                  <td>Moon</td>
                  <td>Sun</td>
                  <td>Star</td>
                  <td>Sun</td>
                  <td>Star</td>
                </tr>
                <tr>
                  <td>Up/skyward</td>
                  <td>Center/down</td>
                  <td>Equator</td>
                  <td>Poles</td>
                  <td>East</td>
                  <td>West</td>
                </tr>
                <tr>
                  <td>transitions</td>
                  <td>transitions</td>
                  <td>Summer</td>
                  <td>Winter</td>
                  <td>Spring</td>
                  <td>Autumn</td>
                </tr>
                </tbody>
              </table>

              <p>
                The <i>wǔxíng</i> notably are described not as simply being a list of five elements, but as having
                "destructive" and "generative" cycles of interactions between them. I've come up with something similar,
                with some of the interactions being inspired by <i>wǔxíng</i>:
              </p>

              <ul>
                <li>Water + Earth → Wood (plants grow from moist soil)</li>
                <li>Wood + Air → Fire (fire consumes organic material and air)</li>
                <li>Fire + Earth → Metal (heat refines ores/oxides into pure metals)</li>
                <li>Metal + Air → Water (water condensates onto metal from the air)</li>
              </ul>

              <p>
                The color associations reinforce the notion of pairs of opposites, as each pair has colors which
                are visual complements (at least, according to
                the <a href="https://en.wikipedia.org/wiki/Opponent_process" target="_blank">opponent process theory of
                color</a>,
                and approximately according to color models like RGB; don't believe the RYB color model you may have
                been
                taught in grade school): black/white, blue/yellow, red/green. I think most of the associations are also
                intuitive, though it seems extremely common cross-culturally to associate fire with the color red, while
                I've associated it with the color yellow. My justification is that flames typically look more yellow
                than
                red, while red (which I've associated with metal) approximately matches the color of both copper and of
                iron oxides, both among the first and most significant metals refined by humans.
              </p>

              <p>
                The Chinese paradigm is the only major one I've seen which attempts to associate the classical planets
                1:1 with elements; I've copied those associations for the most part, but switched Venus and Mars to
                preserve the very strong association between Mars and the color red. I also think the associations make
                much more sense in light of modern knowledge about those planets (though maybe I shouldn't take such
                things into consideration for this project): the surface of Venus is in fact yellowish, volcanically
                active,
                and hotter than
                any other planet, while Mars is quite cool and is in fact red for the exact reason I associate red with
                metal: iron oxide!
              </p>

              <p>
                The association between elements and directions also basically matches the Chinese model, except that
                I've specified a polar/equatorial distinction instead of a north/south one out of fairness to the
                southern
                hemisphere, and split the "center" direction into an up-down. The association between east and wood is
                based on a shared metaphor of growth/beginning; opposite for west and metal, with metal representing
                decay
                or the non-organic. This, and the heat/cold association with fire and water, is linked to the
                associations
                for seasons:
              </p>

              <p>
                Wood is associated with spring because it's a time of growth, greenery, and organic flourishing; metal
                is associated with decay (and relatedly, with the metal implements used to harvest and process
                food crops) and thus autumn. The association between summer/fire and winter/water is a bit
                weird to me but actually very common, at least in Eurasian and African cultures; I suppose the
                association
                between fire and heat, and water being the opposite of fire or being low in temperature, overrides the
                fact
                that winter can be a time of low precipitation in many places.
              </p>

              <p>
                It's worth noting that the four-season
                model itself, while obviously integral to the logic of celestial cards, is not universal, and in e.g.
                South Asia the late summer is a monsoon season. It's hard for me to imagine monsoon not being the season
                of that climactic zone associated with water, so the particular association between seasons and elements
                I've gone with definitely encodes a temperate worldview.
              </p>

              <p>
                Earth and air don't simply vaguely associate with "transitions" as earth does in <i>wǔxíng</i>; specific
                seasonal transitions are associated with one or the other according to the interactions given above:
                the transition from winter to spring is associated with earth, as water + earth yields wood;
                spring to summer is air, because wood + air yields fire; summer to autumn is earth because fire + earth
                yields metal; and autumn to winter is air because metal + air yields water.
              </p>

              <h3>Years</h3>

              <p>
                This is a strictly solar calendar.
                Years begin at the transition from northern hemisphere's solar winter to spring - that is, about
                halfway in between the December solstice and the March equinox. Specifically, New Years' Day can fall
                anywhere from February 3-7 of the
                Gregorian calendar. This is approximately the average date of the East Asian Lunar New Year, though
                the exact date of that Lunar New Year is much more variable because it follows a lunisolar system.
                Early February is
                also the time of the Celtic cross-quarter day Imbolc, also called Saint Brigid's Day.
              </p>

              <p>
                Here are the New Years' Days for the current and next six years:
              </p>

              {dateTable(
                  GregorianDate.localToday().daysAfter(-366),
                  365 * 7 + 3,
                  (d) => d.day.quarter !== -1
              )}

              <h3>Seasons</h3>

              <p>
                Though a four-season model is most common amongst traditional cultures (though two-, three-, and six-
                season models also exist), there are several ways of dividing the year into four seasons, namely,
                "astronomical", "solar", and "meteorological".
              </p>

              <p>
                Astronomical seasons, in which solstices and equinoxes
                mark the start of seasons, were the only type familiar to me for a long time,
                and seem to dominate the North American conception of seasons (with, e.g., the
                spring equinox frequently referred to as the "first day of spring"). However, this is a fairly recent
                cultural development, and IMHO makes easily the least sense of the three models: its seasons don't
                really correspond to any climactic or environmental condition.
              </p>

              <p>
                The most intuitive one, maybe, is
                meteorological - dividing the year into its on-average coldest quarter and calling it winter, calling
                its
                hottest quarter summer, and calling the in-between times spring and autumn. This leads to a highly
                local definition of those seasons, though it's somewhat common to simply round to
                the nearest whole month, with all of December, January, and February being meteorological winter etc.
                Meteorological seasons lag a month or so behind solar seasons (the third kind) due to thermal inertia.
              </p>

              <p>
                This calendar uses the third kind: solar. This divides the year into quarters with winter being the
                quarter receiving the least sunlight and summer receiving the most, with the solstices and equinoxes
                occurring in the middle of their respective seasons. This has the advantage of approximately
                corresponding to weather conditions while being the same across entire hemispheres. It is the method
                of season reckoning favored by both East Asian and premodern European societies (if you've ever been
                confused, as I have, about why the Scandinavian celebrations of of the summer solstice are called
                "Midsummer", this is why).
              </p>

              <h3>Months</h3>

              <p>
                A subdivision of the year into months is nearly universal around the world. In fact, lunisolar calendars
                - in which the months exactly correspond to lunar cycles, and years vary in number of months - are the
                norm
                historically. This calendar is instead like the Gregorian calendar, in that it has months of
                approximately the
                length of a lunar cycle, but is in fact purely solar with months that diverge from the actual sidereal
                month.
              </p>

              <p>
                The months align with the solar season reckoning, beginning on anywhere from the 4<sup>th</sup> to
                9<sup>th</sup> day of each Gregorian month, and with
                solstices and equinoxes occurring in the middle of months. I've provisionally labeled the months with
                the animals of the <a href="https://en.wikipedia.org/wiki/Earthly_Branches">twelve earthly branches</a>,
                used to label months in the traditional Chinese calendar - and perhaps most familiar globally as the
                labeling scheme for <i>years</i> in traditional Chinese calendrics as well (the twelve earthly branches
                are actually used for ordinal labeling in many contexts).
                I'm not very happy with this system though - the
                Chinese calendar is lunisolar and its months can differ from the same-named months of my calendar by
                up to 15 or so days; I think this is as confusing for users of the Chinese calendar as it would be
                for Gregorian calendar users if I named e.g. my first month "February" despite it being several days
                later
                than Gregorian February.
              </p>

              <p>
                I'd like to come up with some other naming scheme which, ideally, still
                doesn't make reference to seasonal events specific to certain regions.
                One alternate possibility is using Western constellations which have ecliptic longitudes in between the
                familiar zodiac constellations (though, none but Ophiuchus actually intersect the ecliptic plane):{' '}
                {CONSTELLATIONS.join(", ")}
              </p>

              <p>
                Within each season, each of the three months is associated with a different celestial shape:
                sun, moon, or star. The sun, being associated with daylight, is assigned to the middle month of summer
                and the months of spring and autumn adjacent to summer. Stars are associated with nighttime, and so
                are assigned to the middle month of winter and the months of spring and autumn adjacent to winter.
                The moon, being visible both at night and in daylight, is the intermediate value, being assigned to the
                middle month of spring and autumn. The last month of summer is associated with star, because of its
                adjacency to autumn (star associates with metal associates with autumn). Similarly, the last month of
                winter is associated with sun because of its adjacency to spring (sun associates with wood associates
                with spring). This leaves the first months of summer and winter to associate with moon.
              </p>

              <h3>The week, and solstices and equinoxes</h3>

              <p>
                The 30-day months are split into five 6-day weeks. The weeks are numbered 1-5, and each week is
                associated
                with a card in the celestial card deck: the season of the week corresponds to the season of the card,
                the celestial body of the month corresponds to the body of the card, and the week's number corresponds
                to the card's number. For instance, the fourth week of the second month of summer is associated with the
                four summer suns card. Try it out for any date <Link to={'/calendar/birthday'}>here</Link>.
              </p>

              <p>
                Each day of the week is associated with an
                element and named after the corresponding planet: Skyday, Jupiterday, Venusday, Marsday, Mercuryday,
                Saturnday.
              </p>

              <p>
                Ancient European, South Asian, and East Asian societies actually agreed on the association between
                the days of the seven-day week and
                classical planets, with Tuesday through Satuday being associated with Mars, Mercury, Jupiter, Venus,
                and Saturn, in that order; this is still fairly apparent in some Eurasian languages like Italian and
                Japanese. I wanted to preserve that order, merely merging Sunday and Monday into Skyday, and it worked
                quite nicely, with the middle four days of the week following the progression of the seasons starting
                with autumn: Mars-metal-autumn, Mercury-water-winter, Jupiter-wood-spring, Venus-fire-summer.
              </p>

              <p>
                I ultimately decided to switch to the current order. With the order I chose, the middle four
                days of the week still follow the cycle of seasons, though now starting with spring, as the whole
                calendar does for the northern hemisphere. However, the actual motivation for doing so is a bit more
                subtle:
              </p>

              <p>
                Due to the eccentricity of Earth's orbit, the solstices and equinoxes are not evenly spaced - the
                equinoxes (especially the March equinox) are a bit closer to the December solstice than the June
                solstice.
                To account for this, my calendar does not simply mark the solstices and equinoxes on the middle day
                of the middle month of each season - it marks them on the day of the middle week of the middle month
                which matches the season itself. That is, (in the northern hemisphere), the spring equinox is marked
                on the 14<sup>th</sup> day (Jupiterday) of spring's middle month,
                the summer equinox on the 15<sup>th</sup> day (Venusday) of summer's middle month,
                the autumn equinox on the 16<sup>th</sup> day (Marsday) of autumn's middle month,
                and the winter equinox on the 17<sup>th</sup> day (Mercuryday) of winter's middle month.
                This puts 92 days in between the March equinox and June solstice, 92 (or 93 in leap years) days in
                between the June solstice and September equinox, 92 days in between the September equinox and December
                solstice, and 89 days in between the December solstice and March equinox, which is very close to the
                actual spacing between those events. It ends up that the calendar typically marks solstices and
                equinoxes
                no more than a day off of the actual moment of those astronomical events.
              </p>

              <h3>Special days</h3>

              <p>
                Sixty weeks of six days each adds to 360 days, leaving five (or six) days unaccounted for. The
                transitions
                between seasons are marked by a special day which is outside of any week; these days are best known
                in English-language custom according to their anglicized Irish names: Imbolc, Beltane, Lunasa, and
                Samhain,
                and I've labeled them as such.
                These so-called <a href="https://en.wikipedia.org/wiki/Quarter_days#In_Ireland" target="_blank">
                cross-quarter days</a> are the most significant holidays in Celtic paganism; Beltane and Samhain in
                particular
                are somewhat more widely known as being predecessors of/equivalent to May Day and Halloween. Though, in
                Ireland they've long been celebrated on the first day of Gregorian months (February, May, August,
                November),
                whereas in this calendar they're of course a few days later.
              </p>

              <p>
                The fifth and final special day in non-leap years is New Years' Day, marked the day before Imbolc
                (early February).
                On leap years, a leap day is inserted opposite of New Years' Day, the day before Lunasa (early August).
              </p>

              <h3>Leap years, cycles and ages</h3>

              <p>
                Years are grouped into 128-year cycles, analogous to centuries, the Chinese sexagenary cycle, or the
                Mayan Calendar Round. This number was chosen for the sake of correctly spacing leap years. Like in the
                Gregorian calendar, years with numbers divisible by four are leap years, with some exceptions. In the
                Gregorian calendar, years divisible by 100 are not leap years unless they are also divisible by 400.
                In this calendar, the final year of each cycle is not a leap year, so that each 128-year cycle contains
                31 leap years. The average length of a Gregorian year is 365.2425 days, while the average length of
                a year in this calendar is 365.2421875 days. The mean tropical year is about 365.24217 mean solar days,
                so it is more closely tracked by this calendar than the Gregorian calendar. The difference in average
                year length means that this calendar and the Gregorian calendar will drift apart by one day every 3200
                years. Of course, since the leap years are distributed differently, a given Gregorian date will vary a
                bit in which date it corresponds to in this calendar even on short timescales.
              </p>

              <p>
                Cycles are further grouped into ages, which last 12 cycles, or 1,536 years.
                Year names are given as "the x<sup>th</sup> year of the y<sup>th</sup> cycle of the z<sup>th</sup> age".
                The cycles within an age can be thought of as analogous to months in a year, with each age proceeding
                through a seasonal cycle beginning with spring and ending with winter.
              </p>

              <p>
                The first era of this calendar began in February of {-FIRST_YEAR} BCE.
                There's nothing special about that specific year,
                but it is approximately when the first known true writing dates to, with the intent that all written
                history should fall into the positive years of the calendar rather than messing with some kind of
                confusing BCE situation.
              </p>

              <p>
                We are currently living in the 4<sup>th</sup> age of the calendar. Here are the Gregorian years in
                which the first five ages begin:
              </p>

              <ul>
                {[0, 1, 2, 3, 4].map(i => (
                    <li key={i}>
                      the {ordinal(i + 1)} age {i > 3 ? "will begin" : "began"} in {gregorianYearWithEra(FIRST_YEAR + (i * CYCLE_LENGTH * AGE_LENGTH) + 1)}
                    </li>
                ))}
              </ul>

              <p>
                Here are the Gregorian years in which the cycles of the 4<sup>th</sup> age begin:
              </p>

              <ul>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => (
                    <li key={i}>
                      the {ordinal(i + 1)} cycle of the 4<sup>th</sup> age {i > 5 ? "will begin" : "began"} in {gregorianYearWithEra(FIRST_YEAR + (3 * CYCLE_LENGTH * AGE_LENGTH) + (i*CYCLE_LENGTH) + 1)}
                    </li>
                ))}
              </ul>

              <h3>Extended calendar</h3>

              <p>
                Just for ease of reference, here's all days two years in the past and future:
              </p>

              {dateTable(
                  GregorianDate.localToday().daysAfter(-365 * 2 - 1),
                  365 * 4 + 2,
                  _ => false
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
