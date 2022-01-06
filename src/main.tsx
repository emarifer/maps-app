import React from 'react';
import ReactDOM from 'react-dom';
import { MapsApp } from './MapsApp';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.css';

// mapboxgl.accessToken
// 	= 'pk.eyJ1IjoiZW1hcmlmZXIiLCJhIjoiY2t5MDZ5aW4wMDBhdDJwbzRuMmpuZnIxNCJ9.YgX2fl2_DmbFDztFOn4HGg';
// console.log(import.meta.env.VITE_API_ACCESS_TOKEN);

mapboxgl.accessToken = import.meta.env.VITE_API_ACCESS_TOKEN;

if (!navigator.geolocation) {
	// eslint-disable-next-line no-alert
	alert('Your browser does not have a geolocation option');
	throw new Error('Your browser does not have a geolocation option');
}

ReactDOM.render(
	<React.StrictMode>
		<MapsApp />
	</React.StrictMode>,
	document.getElementById('root'),
);

/**
 * My Location: 37.37573936250836, -5.981483555993748
 */

/**
 * SOBRE EL USO DE VARIABLES DE ENTORNO EN VITE. VER:
 * https://vitejs.dev/guide/env-and-mode.html
 * https://github.com/vitejs/vite/issues/3524#issuecomment-848641926
 */

/**
 * MODIFICAR FORMATO DE SWEETALERT2 Y PREVENIR CIERRA FUERA DEL MODAL. VER:
 * https://stackoverflow.com/questions/57079469/how-to-change-font-family-of-sweetalert#67784289
 * https://stackoverflow.com/questions/47749095/prevent-sweetalert-to-be-closed-on-clicking-outside-the-popup-window/56562050
 */
