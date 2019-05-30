import { Component,  Input, ViewChild, NgZone, OnInit } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';

declare var google: any;
  
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?:string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  // styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

 
  geocoder:any;
  public location:Location = {
    lat: 51.678418,
    lng: 7.809007,
    marker: {
      lat: 51.678418,
      lng: 7.809007,
      draggable: true
    },
    zoom: 5
  };

  @ViewChild(AgmMap) map: AgmMap;


  constructor(public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper) {
      this.mapsApiLoader = mapsApiLoader;
      this.zone = zone;
      this.wrapper = wrapper;
      this.mapsApiLoader.load().then(() => {
        this.geocoder = new google.maps.Geocoder();
      });
   }

  ngOnInit() {
    this.location.marker.draggable = true;

  }

  updateOnMap() {
    let full_address:string = this.location.address_level_1 || ""
    if (this.location.address_level_2) full_address = full_address + " " + this.location.address_level_2
    if (this.location.address_state) full_address = full_address + " " + this.location.address_state
    if (this.location.address_country) full_address = full_address + " " + this.location.address_country
 
    this.findLocation(full_address);
  }

  findLocation(address) {
    if (!this.geocoder) this.geocoder = new google.maps.Geocoder()
    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      console.log(results);
      if (status == google.maps.GeocoderStatus.OK) {
                // decompose the result
      } else {
        alert("Sorry, this search produced no results.");
      }
    })
  }
 
}


window.addEventListener('load',function(){
  
  //firebase.initializeApp(config);

  /**Variables de Mapas*/
  var map;
  var mapaLatLng;
  var marker;
  var markerLatLng;
  var btnPosicion = document.getElementById("btnPosicion");
  var btnBorrarPosicion = document.getElementById("btnBorrarPosicion");
  var btnGetCanchas = document.getElementById("btnGetEstacionamientos");
  var divCanchas = document.getElementById("estacionamientos");
  var inputLatitud = document.getElementById("inputLatitud");
  var inputLongitud = document.getElementById("inputLongitud");

  // var canchasFirebase = [];
  // var marcadoresFirebase = [];

  //1. crear la referencia al nodo en firebase
  //var referencia = firebase.database().ref('canchitas');
  //creando la referencia al storage de Firebase
  //var referenciaStorage = firebase.storage().ref();

  


  // btnGetEstacionamientos.addEventListener('click',()=>{
  //     divEstacionamientos.innerHTML = "";
  //     divEstacionamientos.append(cargando);
  //     estacionamientosFirebase = [];

  //     referencia.on('value',(data)=>{
  //       divEstacionamientos.innerHTML = "";
  //       estacionamientosFirebas = [];
  //         llenarEstacionamientos(data);
  //     });
  // });



  // btnPosicion.addEventListener('click',()=>{
  //     marker = new google.maps.Marker(
  //         {
  //             // position:miPosicion,
  //             position:{lat:miPosicion.lat,lng:miPosicion.lng},
  //             map:map,
  //             draggable:true,
  //             icon: './img/marcador.png'
  //         }
  //     );
  // });

  

  btnBorrarPosicion.addEventListener('click',()=>{
      marker.setMap(null);
  });


  var div = document.getElementById('map');

  var miPosicion = {
      lat:0,
      lng:0
  }



  // function initMap() {
  //     map = new google.maps.Map(div, {
  //         center: miPosicion,
  //         zoom: 13
  //     });
  // }
  // function initMapLatLng(){
  //     mapaLatLng = new google.maps.Map(document.getElementById('mapaLatLng'), {
  //         center: miPosicion,
  //         zoom: 13
  //     });
  //     mapaLatLng.addListener('click',(coors)=>{
  //       if(markerLatLng){
  //           markerLatLng.setMap(null);
  //       }

  //       inputLatitud.setAttribute("value",coors.latLng.lat());
  //       inputLongitud.setAttribute("value",coors.latLng.lng());

  //       markerLatLng = new google.maps.Marker(
  //         {
  //           position:coors.latLng,
  //           map:mapaLatLng,
  //           icon: './img/marcador.png'
  //         });

  //     });
  //     var inputBusqueda = document.getElementById("inputBusqueda");
  //     //creando un elemento de búsqueda de Google maps
  //     var searchBox = new google.maps.places.SearchBox(inputBusqueda);
  //     //inyectando y posicionando un elemento dentro del mapa de Google
  //     mapaLatLng.controls[google.maps.ControlPosition.TOP_LEFT].push(inputBusqueda);


  //     searchBox.addListener("places_changed",()=>{
  //       var places = searchBox.getPlaces();
  //       if(places.length == 0){
  //         return;
  //       }
  //       places.forEach((place)=>{
  //         console.log(place.geometry.location.lat());
  //       });
  //     });



  // }


  //Usando la geolocalización(nativo de JavaScript)
  let getLocation = ()=>{
      if(navigator.geolocation){
          //significa que el navegador tiene disponible la geolocalozación
          navigator.geolocation.getCurrentPosition((position)=>{
            //en este punto, se solicita al usuario permitir conocer su ubicación
              miPosicion.lat = position.coords.latitude;
              miPosicion.lng = position.coords.longitude;
              // initMap();
              // initMapLatLng();
          },(error)=>{
              console.log("error",error);
          });
      }else{
          //el navegador no soporta geolocalización
          alert("Tu navegador no soporta geolocalización");
      }
  }

  getLocation();


  // let llenarCanchas = (data)=>{
  //     //data es el arreglo de elementos tomados de Firebase
  //     if(data){
  //         divEstacionamientos.innerHTML = "";
  //         //recorremos el arreglo de canchas de firebase
  //         //representado en el objeto fila en cada iteración
  //         data.forEach((fila)=>{
  //             //agregando cada cancha mapeada en el objeto Cancha
  //             //al arreglo canchasFirebase
  //             estacionamientosFirebase.push(new Estacionamiento(fila.key,
  //                                             fila.val().direccion,
  //                                             fila.val().lat,
  //                                             fila.val().lng,
  //                                             fila.val().nombre,
  //                                             fila.val().telefono));
  //         });

          /**
           * Creando la tabla de estacionamientos
           */

           let tabla = document.createElement("table");
           tabla.setAttribute('class','table table-hover');

           let trCabecera = document.createElement("tr");
           let thId = document.createElement("th");
           let thNombre = document.createElement("th");
           thId.innerHTML = "ID";
           thNombre.innerHTML = "Nombre";
           trCabecera.append(thId,thNombre);
           tabla.append(trCabecera);

  //          estacionamientosFirebase.forEach((estacionamiento)=>{

  //             let tr = document.createElement("tr");
  //             let tdId = document.createElement("td");
  //             tdId.innerHTML = estacionamiento.id;
  //             let tdNombre = document.createElement("td");
  //             tdNombre.innerHTML = estacionamiento.nombre;
  //             tr.append(tdId,tdNombre);
  //             tabla.append(tr);

  //             //llenando marcadores en el mapa
  //             //creamos un marcador
  //             let marcadorTmp = new google.maps.Marker({
  //                 position:{lat:estacionamiento.lat,lng:estacionamiento.lng},
  //                 map:map,
  //                 icon: './img/marcador.png'
  //             });

  //             marcadoresFirebase.push(marcadorTmp);


  //          });
  //          divEstacionamientos.append(tabla);
  //     }else{
  //         divEstacionamientos.innerHTML = "<h2>No hay estacionamientos</h2>";
  //     }
  // }

  

});
