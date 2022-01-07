var z=Object.defineProperty,F=Object.defineProperties;var A=Object.getOwnPropertyDescriptors;var S=Object.getOwnPropertySymbols;var B=Object.prototype.hasOwnProperty,_=Object.prototype.propertyIsEnumerable;var k=(t,e,o)=>e in t?z(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,u=(t,e)=>{for(var o in e||(e={}))B.call(e,o)&&k(t,o,e[o]);if(S)for(var o of S(e))_.call(e,o)&&k(t,o,e[o]);return t},m=(t,e)=>F(t,A(e));import{r as i,a as N,j,m as f,S as J,R as Z,G as $,b as O,c as Y,d as G}from"./vendor.65e7615f.js";const H=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}};H();const y=i.exports.createContext({}),U=async()=>new Promise((t,e)=>{navigator.geolocation.getCurrentPosition(({coords:o})=>{t([o.longitude,o.latitude])},o=>{alert("Could not get geolocation"),console.error(o),e()})}),W=(t,e)=>{switch(e.type){case"setUserLocation":return m(u({},t),{isLoading:!1,userLocation:e.payload});case"setLoadingPlaces":return m(u({},t),{isLoadingPlaces:!0,places:[]});case"setPlaces":return m(u({},t),{isLoadingPlaces:!1,places:e.payload});case"setShowListPlaces":return m(u({},t),{showListPlaces:!t.showListPlaces});default:return t}},X=N.create({baseURL:"https://api.mapbox.com/directions/v5/mapbox/driving",params:{alternatives:!1,geometries:"geojson",overview:"simplified",steps:!1,access_token:"pk.eyJ1IjoiZW1hcmlmZXIiLCJhIjoiY2t5MDZ5aW4wMDBhdDJwbzRuMmpuZnIxNCJ9.YgX2fl2_DmbFDztFOn4HGg"}}),K=N.create({baseURL:"https://api.mapbox.com/geocoding/v5/mapbox.places",params:{limit:5,language:"es",access_token:"pk.eyJ1IjoiZW1hcmlmZXIiLCJhIjoiY2t5MDZ5aW4wMDBhdDJwbzRuMmpuZnIxNCJ9.YgX2fl2_DmbFDztFOn4HGg"}}),s=j.exports.jsx,g=j.exports.jsxs,Q={isLoading:!0,userLocation:void 0,isLoadingPlaces:!1,showListPlaces:!1,places:[]},V=({children:t})=>{const[e,o]=i.exports.useReducer(W,Q);i.exports.useEffect(()=>{U().then(r=>o({type:"setUserLocation",payload:r}))},[]);const c=async r=>{if(r.length===0)return o({type:"setPlaces",payload:[]}),[];if(!e.userLocation)throw new Error("No user location");o({type:"setLoadingPlaces"});const a=await K.get(`/${r}.json`,{params:{proximity:e.userLocation.join(",")}});return o({type:"setPlaces",payload:a.data.features}),a.data.features},n=()=>o({type:"setShowListPlaces"});return s(y.Provider,{value:m(u({},e),{searchPlacesByTerms:c,setShowListPlaces:n}),children:t})},v=i.exports.createContext({}),q=(t,e)=>{switch(e.type){case"setMap":return m(u({},t),{isMapReady:!0,map:e.payload});case"setMarkers":return m(u({},t),{markers:e.payload});default:return t}};const ee={isMapReady:!1,map:void 0,markers:[]},te=({children:t})=>{const[e,o]=i.exports.useReducer(q,ee),{places:c}=i.exports.useContext(y);i.exports.useEffect(()=>{e.markers.forEach(p=>p.remove());const a=[];for(const p of c)if(e.map){const[d,L]=p.center,l=new f.exports.Popup().setHTML(`
					<h6>${p.text_es}</h6>
					<p>${p.place_name_es}</p>
				`),h=new f.exports.Marker({color:"#1fa01a"}).setLngLat([d,L]).setPopup(l).addTo(e.map);a.push(h)}o({type:"setMarkers",payload:a})},[c]);const n=a=>{const p=new f.exports.Popup().setHTML(`
			<h5>Esta es mi ubicaci\xF3n</h5>
			<p>En alg\xFAn lugar de Sevilla\u2026</p>
		`);new f.exports.Marker({color:"#8a2be2"}).setLngLat(a.getCenter()).setPopup(p).addTo(a);const d=new f.exports.ScaleControl;a.addControl(d),o({type:"setMap",payload:a})},r=async(a,p)=>{var b,P,M,C;const d=await X.get(`${a.join(",")};${p.join(",")}`),{distance:L,duration:l,geometry:h}=d.data.routes[0],{coordinates:x}=h,I=Math.round(L/1e3*100)/100,T=Math.round(l/60*100)/100;J.fire({heightAuto:!1,icon:"info",title:"Route information",html:`<b>Distance</b>: ${I} km<br /><b>Duration</b>: ${T} min`,position:"bottom-end",allowOutsideClick:!1});const w=new f.exports.LngLatBounds(a,a);x.forEach(R=>{const E=[R[0],R[1]];w.extend(E)}),(b=e.map)==null||b.fitBounds(w,{padding:100});const D={type:"geojson",data:{type:"FeatureCollection",features:[{type:"Feature",properties:{},geometry:{type:"LineString",coordinates:x}}]}};((P=e.map)==null?void 0:P.getLayer("RouteString"))&&(e.map.removeLayer("RouteString"),e.map.removeSource("RouteString")),(M=e.map)==null||M.addSource("RouteString",D),(C=e.map)==null||C.addLayer({id:"RouteString",type:"line",source:"RouteString",layout:{"line-cap":"round","line-join":"round"},paint:{"line-color":"blue","line-width":4}})};return s(v.Provider,{value:m(u({},e),{setMap:n,getRouteBetweenPoints:r}),children:t})},oe=()=>{const{map:t,isMapReady:e}=i.exports.useContext(v),{userLocation:o}=i.exports.useContext(y);return s("button",{onClick:()=>{if(!e)throw new Error("The map is not ready");if(!o)throw new Error("No user location");t==null||t.flyTo({zoom:14,center:o})},title:"My Location",className:"btn btn-primary",style:{position:"fixed",top:"20px",right:"20px",zIndex:999},children:s(Z,{style:{width:"3rem",height:"2rem"}})})};const se=()=>g("div",{className:"loading-map d-flex justify-content-center align-items-center flex-column",children:[g("div",{className:"lds-ring",children:[s("div",{}),s("div",{}),s("div",{}),s("div",{})]}),s("div",{className:"mt-3",children:"Locating\u2026"})]}),ne=()=>{const{isLoading:t,userLocation:e}=i.exports.useContext(y),{setMap:o}=i.exports.useContext(v),c=i.exports.useRef(null);return i.exports.useLayoutEffect(()=>{var n;if(!t){const r=new f.exports.Map({container:(n=c==null?void 0:c.current)!=null?n:"",style:"mapbox://styles/mapbox/streets-v11",center:e,zoom:14});o(r)}},[t]),s("div",{ref:c,style:{height:"100vh",left:0,position:"fixed",top:0,width:"100vw"},children:t?s(se,{}):e==null?void 0:e.join(",")})};var re="/maps-app/assets/logo.df7320db.svg";const ae=()=>s("img",{src:re,alt:"React Logo",style:{position:"fixed",bottom:"20px",right:"20px",width:"130px"}});function ie(t){return $({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M396 512a112 112 0 1 0 224 0 112 112 0 1 0-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z"}}]})(t)}const ce=()=>{const{searchPlacesByTerms:t,setShowListPlaces:e,showListPlaces:o,places:c,isLoadingPlaces:n}=i.exports.useContext(y),{map:r}=i.exports.useContext(v),a=i.exports.useRef(),p=d=>{(r==null?void 0:r.getLayer("RouteString"))&&(r.removeLayer("RouteString"),r.removeSource("RouteString")),a.current&&clearTimeout(a.current),a.current=setTimeout(()=>{t(d.target.value)},1e3)};return g("div",{className:"search-container",style:o&&c.length!==0?{}:{paddingTop:"0px"},children:[g("div",{className:"search-control",children:[s("input",{onChange:p,type:"text",className:"form-control",placeholder:"Find a place\u2026"}),s("div",{className:"show-icon",children:s(ie,{onClick:e})})]}),(n||o)&&s(le,{})]})},le=()=>{const{places:t,isLoadingPlaces:e,userLocation:o,setShowListPlaces:c}=i.exports.useContext(y),{map:n,getRouteBetweenPoints:r}=i.exports.useContext(v),[a,p]=i.exports.useState(""),d=l=>{p(l.id);const[h,x]=l.center;n==null||n.flyTo({zoom:14,center:[h,x]})},L=l=>{if(!o)return;const[h,x]=l.center;r(o,[h,x]),c()};return e?g("div",{className:"d-flex justify-content-center align-items-center flex-column mt-5",children:[g("div",{className:"lds-ring",children:[s("div",{}),s("div",{}),s("div",{}),s("div",{})]}),s("div",{className:"mt-3",children:"Locating places\u2026"})]}):s("ul",{className:`list-group ${t.length===0?"":"mt-3"}`,children:t.map(l=>g("li",{onClick:()=>d(l),className:`list-group-item list-group-item-action pointer ${a===l.id?"active":""}`,children:[s("h6",{children:l.text_es}),s("p",{style:{fontSize:"12px"},children:l.place_name}),s("button",{onClick:()=>L(l),className:`btn btn-sm ${a===l.id?"btn-outline-light":"btn-outline-primary"}`,children:"Addresses"})]},l.id))})},pe=()=>g("div",{children:[s(ne,{}),s(oe,{}),s(ae,{}),s(ce,{})]}),de=()=>s(V,{children:s(te,{children:s(pe,{})})});O.accessToken="pk.eyJ1IjoiZW1hcmlmZXIiLCJhIjoiY2t5MDZ5aW4wMDBhdDJwbzRuMmpuZnIxNCJ9.YgX2fl2_DmbFDztFOn4HGg";if(!navigator.geolocation)throw alert("Your browser does not have a geolocation option"),new Error("Your browser does not have a geolocation option");Y.render(s(G.StrictMode,{children:s(de,{})}),document.getElementById("root"));