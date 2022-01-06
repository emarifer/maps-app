import { useContext, useLayoutEffect, useRef } from 'react';
import { MapContext, PlacesContext } from '../context';
import { Map } from 'mapbox-gl';
import { Spinner } from './Spinner/Spinner';
// import { Loading } from './';

export const MapView = () => {
	const { isLoading, userLocation } = useContext(PlacesContext);
	const { setMap } = useContext(MapContext);

	const mapDiv = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (!isLoading) {
			const map = new Map({
				container: mapDiv?.current ?? '', // container ID. VER EVITAR ERROR ESLINT:
				style: 'mapbox://styles/mapbox/streets-v11', // style URL
				center: userLocation, // starting position [lng, lat]
				zoom: 14, // starting zoom
			});
			setMap(map);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	// if (isLoading) {
	//     return <Spinner />;
	// }

	return (
		<div
			ref={mapDiv}
			style={{
				height: '100vh',
				left: 0,
				position: 'fixed',
				top: 0,
				width: '100vw',
			}}
		>
			{isLoading ? <Spinner /> : userLocation?.join(',')}
		</div>
	);
};

/**
 * Disallows non-null assertions using the ! postfix operator (no-non-null-assertion:
 * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-non-null-assertion.md
 */
