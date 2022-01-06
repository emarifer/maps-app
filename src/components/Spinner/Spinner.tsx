import './spinner.css';

export const Spinner = () => (
	<div className="loading-map d-flex justify-content-center align-items-center flex-column">
		<div className="lds-ring">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
		<div className="mt-3">Locating…</div>
	</div>
);
