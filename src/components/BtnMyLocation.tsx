import { useContext } from 'react';
import { MapContext, PlacesContext } from '../context';
import { RiUserLocationFill } from 'react-icons/ri';

export const BtnMyLocation = () => {
	const { map, isMapReady } = useContext(MapContext);
	const { userLocation } = useContext(PlacesContext);

	const onClick = () => {
		if (!isMapReady) throw new Error('The map is not ready');

		if (!userLocation) throw new Error('No user location');

		map?.flyTo({
			zoom: 14,
			center: userLocation,
		});
	};

	return (
		<button
			onClick={onClick}
			title="My Location"
			className="btn btn-primary"
			style={{
				position: 'fixed',
				top: '20px',
				right: '20px',
				zIndex: 999,
			}}
		>
			<RiUserLocationFill
				style={{
					width: '3rem',
					height: '2rem',
				}}
			/>
		</button>
	);
};

/**
 * Tooltips for Button elements:
 * https://stackoverflow.com/questions/2238239/tooltips-for-button-elements
 */
