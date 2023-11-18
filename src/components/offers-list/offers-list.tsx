import { useState } from 'react';
import { City } from '../../types/city';
import { Offer } from '../../types/offer';
import { addPluralEnding } from '../../utils/common';
import OfferCard from '../offer-card/offer-card';
import Map from '../map/map';

type OffersListProps = {
  currentLocation: City;
  currentOffers: Offer[];
}

function OffersList ({currentOffers, currentLocation}: OffersListProps): JSX.Element {
  const [selectedOfferCardId, setSelectedOfferCardId] = useState<number | null>(null);

  const handleCardHover = (offerId: number | null) => {
    setSelectedOfferCardId(offerId);
  };

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{currentOffers.length} place{addPluralEnding(currentOffers.length)} to stay in {currentLocation.name}</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
                  Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex={0}>Popular</li>
            <li className="places__option" tabIndex={0}>Price: low to high</li>
            <li className="places__option" tabIndex={0}>Price: high to low</li>
            <li className="places__option" tabIndex={0}>Top rated first</li>
          </ul>
        </form>
        <div className="cities__places-list places__list tabs__content">
          {currentOffers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              block="cities"
              onCardHover={handleCardHover}
            />
          ))}
        </div>
      </section>
      <div className="cities__right-section">
        <Map offers={currentOffers} city={currentLocation} hoveredOfferId={selectedOfferCardId} className={'cities__map'} />
      </div>
    </div>
  );
}

export default OffersList;
