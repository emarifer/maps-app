import { ChangeEvent, useContext, useRef } from 'react';
import { SearchResults } from '.';
import { PlacesContext } from '../context';
import { AiFillEye } from 'react-icons/ai';

export const SearchBar = () => {
	const { searchPlacesByTerms, setShowListPlaces, showListPlaces } = useContext(
		PlacesContext,
	);

	const debounceRef = useRef<NodeJS.Timeout>();

	const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
		if (debounceRef.current) clearTimeout(debounceRef.current);

		debounceRef.current = setTimeout(() => {
			// console.log('debounce value', event.target.value);
			searchPlacesByTerms(event.target.value);
		}, 1000);
	};

	return (
		<div
			className="search-container"
			style={showListPlaces ? {} : { paddingTop: '0px' }}
		>
			<div className="search-control">
				<input
					onChange={onQueryChanged}
					type="text"
					className="form-control"
					placeholder="Find a place…"
				/>

				<div className="show-icon">
					<AiFillEye onClick={setShowListPlaces} />
				</div>
			</div>

			{showListPlaces && <SearchResults />}
		</div>
	);
};

/**
 * ERROR EN NodeJS.Timeout
 * https://github.com/Chatie/eslint-config/issues/45#issuecomment-885507652
 */
