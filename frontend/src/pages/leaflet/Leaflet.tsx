import '@/styles/leaflet/leaflet.scss'
import leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
function Leaflet() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let DefaultIcon = leaflet.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    });
    leaflet.Marker.prototype.options.icon = DefaultIcon;
    
    if(mapRef.current) {
      const map = leaflet.map(mapRef.current).setView([23.117, 113.26], 15);

      leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      leaflet.marker([23.117, 113.26]).addTo(map)
        .bindPopup('海珠广场')
        //.openPopup();
      leaflet.marker([23.1315, 113.258]).addTo(map)
        .bindPopup('六榕街道，北京街道')
        .openPopup();

      leaflet.circle([23.117, 113.26], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.3,
          radius: 500
      }).addTo(map);

      leaflet.polygon([
        [23.128, 113.25],
        [23.1348, 113.25],
        [23.1348, 113.27],
        [23.128, 113.27],
    ]).addTo(map);

      return () => {
        map.remove();
      }
    }
  }, [])
  return (
    <div>
      <h4>GIS ~</h4>
      <div ref={mapRef} style={{ width: '100%', height: '100vh' }}></div>
    </div>
  );
}

export default Leaflet;