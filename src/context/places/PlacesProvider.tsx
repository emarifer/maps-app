import { useEffect, useReducer } from 'react';
import { getUserLocation } from '../../helpers';
import { PlacesContext } from './PlacesContext';
import { placesReducer } from './placesReducer';
import { searchApi } from '../../apis';
import { Feature, PlacesResponse } from '../../interfaces/places';

export interface PlacesState {
	isLoading: boolean;
	userLocation?: [number, number];
	isLoadingPlaces: boolean;
	showListPlaces: boolean;
	places: Feature[];
}

const INITIAL_STATE: PlacesState = {
	isLoading: true,
	userLocation: undefined,
	isLoadingPlaces: false,
	showListPlaces: false,
	places: [],
};

type Props = {
	children: JSX.Element | JSX.Element[];
};

export const PlacesProvider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

	useEffect(() => {
		getUserLocation().then((lnglat) =>
			dispatch({ type: 'setUserLocation', payload: lnglat }),
		);
	}, []);

	const searchPlacesByTerms = async (query: string): Promise<Feature[]> => {
		if (query.length === 0) {
			dispatch({ type: 'setPlaces', payload: [] });
			return [];
		}

		if (!state.userLocation) throw new Error('No user location');

		dispatch({ type: 'setLoadingPlaces' });

		const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
			params: {
				proximity: state.userLocation.join(','),
			},
		});

		dispatch({ type: 'setPlaces', payload: resp.data.features });

		return resp.data.features;
	};

	const setShowListPlaces = () => dispatch({ type: 'setShowListPlaces' });

	return (
		<PlacesContext.Provider
			value={{
				...state,
				// Methods:
				searchPlacesByTerms,
				setShowListPlaces,
			}}
		>
			{children}
		</PlacesContext.Provider>
	);
};
