import { useContext, useState } from 'react';
import { MapContext, PlacesContext } from '../context';
import { Feature } from '../interfaces/places';

export const SearchResults = () => {
	const { places, isLoadingPlaces, userLocation, setShowListPlaces } = useContext(
		PlacesContext,
	);

	const { map, getRouteBetweenPoints } = useContext(MapContext);

	const [activePlace, setActivePlace] = useState('');

	const onPlaceClicked = (place: Feature) => {
		setActivePlace(place.id);

		const [lgn, lat] = place.center;

		map?.flyTo({
			zoom: 14,
			center: [lgn, lat],
		});
	};

	const getRoute = (place: Feature) => {
		if (!userLocation) return;

		const [lng, lat] = place.center;

		getRouteBetweenPoints(userLocation, [lng, lat]);

		setShowListPlaces();
	};

	return isLoadingPlaces ? (
		<div className="d-flex justify-content-center align-items-center flex-column mt-5">
			<div className="lds-ring">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div className="mt-3">Locating places…</div>
		</div>
	) : (
		<ul className={`list-group ${places.length === 0 ? '' : 'mt-3'}`}>
			{places.map((place) => (
				<li
					key={place.id}
					onClick={() => onPlaceClicked(place)}
					className={`list-group-item list-group-item-action pointer ${
						activePlace === place.id ? 'active' : ''
					}`}
				>
					<h6>{place.text_es}</h6>
					<p style={{ fontSize: '12px' }}>{place.place_name}</p>

					<button
						onClick={() => getRoute(place)}
						className={`btn btn-sm ${
							activePlace === place.id
								? 'btn-outline-light'
								: 'btn-outline-primary'
						}`}
					>
						Addresses
					</button>
				</li>
			))}
		</ul>
	);
};
