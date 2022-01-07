import { useContext, useEffect, useReducer } from 'react';
import {
	AnySourceData,
	LngLatBounds,
	Map,
	Marker,
	Popup,
	ScaleControl,
} from 'mapbox-gl';
import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';
import { PlacesContext } from '../';
import { directionsApi } from '../../apis';
import { DirectionsResponse } from '../../interfaces/directions';
import Swal from 'sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';

export interface MapState {
	isMapReady: boolean;
	map?: Map;
	markers: Marker[];
}

const INITIAL_STATE: MapState = {
	isMapReady: false,
	map: undefined,
	markers: [],
};

type Props = {
	children: JSX.Element | JSX.Element[];
};

export const MapProvider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

	const { places } = useContext(PlacesContext);

	useEffect(() => {
		state.markers.forEach((marker) => marker.remove());

		const newMarkers: Marker[] = [];

		for (const place of places) {
			if (state.map) {
				const [lng, lat] = place.center;

				const popup = new Popup().setHTML(`
					<h6>${place.text_es}</h6>
					<p>${place.place_name_es}</p>
				`);

				const newMarker = new Marker({
					color: '#1fa01a',
				})
					.setLngLat([lng, lat])
					.setPopup(popup)
					.addTo(state.map);

				newMarkers.push(newMarker);
			}
		}

		// TODO: limpiar polylines

		dispatch({ type: 'setMarkers', payload: newMarkers });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [places]);

	const setMap = (map: Map) => {
		const myLocationPopup = new Popup().setHTML(`
			<h5>Esta es mi ubicación</h5>
			<p>En algún lugar de Sevilla…</p>
		`);

		new Marker({
			color: '#8a2be2',
		})
			.setLngLat(map.getCenter())
			.setPopup(myLocationPopup)
			.addTo(map);

		const scale = new ScaleControl();
		map.addControl(scale);

		dispatch({ type: 'setMap', payload: map });
	};

	const getRouteBetweenPoints = async (
		start: [number, number],
		end: [number, number],
	) => {
		// Obtencion de datos
		const resp = await directionsApi.get<DirectionsResponse>(
			`${start.join(',')};${end.join(',')}`,
		);

		const { distance, duration, geometry } = resp.data.routes[0];
		const { coordinates: coords } = geometry;

		const kms = Math.round((distance / 1000) * 100) / 100;
		const min = Math.round((duration / 60) * 100) / 100;

		// console.log(`distance: ${kms}km\nduration: ${min} min`);

		Swal.fire({
			heightAuto: false,
			icon: 'info',
			title: 'Route information',
			html: `<b>Distance</b>: ${kms} km<br /><b>Duration</b>: ${min} min`,
			position: 'bottom-end',
			allowOutsideClick: false,
		});

		// Limites y poscionamiento de la ruta
		const bounds = new LngLatBounds(start, start);

		coords.forEach((coord) => {
			const newCoord: [number, number] = [coord[0], coord[1]];
			bounds.extend(newCoord);
		});

		state.map?.fitBounds(bounds, { padding: 100 });

		// Creacion de la polyline (dibujado de la ruta)
		const sourceData: AnySourceData = {
			type: 'geojson',
			data: {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						properties: {},
						geometry: {
							type: 'LineString',
							coordinates: coords,
						},
					},
				],
			},
		};

		if (state.map?.getLayer('RouteString')) {
			state.map.removeLayer('RouteString');
			state.map.removeSource('RouteString');
		}

		state.map?.addSource('RouteString', sourceData);
		state.map?.addLayer({
			id: 'RouteString',
			type: 'line',
			source: 'RouteString',
			layout: {
				'line-cap': 'round',
				'line-join': 'round',
			},
			paint: {
				'line-color': 'blue',
				'line-width': 4,
			},
		});
	};

	return (
		<MapContext.Provider
			value={{
				...state,
				// Methods
				setMap,
				getRouteBetweenPoints,
			}}
		>
			{children}
		</MapContext.Provider>
	);
};

/**
 * MODIFICAR FORMATO DE SWEETALERT2 Y PREVENIR CIERRA FUERA DEL MODAL. VER:
 * https://stackoverflow.com/questions/57079469/how-to-change-font-family-of-sweetalert#67784289
 * https://stackoverflow.com/questions/47749095/prevent-sweetalert-to-be-closed-on-clicking-outside-the-popup-window/56562050
 */
