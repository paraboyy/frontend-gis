<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Konten Kiri -->
      <div class="col-md-2 bg-light shadow-lg pt-3 pb-3 custom-border">
        <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
          <ul class="nav nav-pills" style="display: block;">
            <li class="btn-display active px-5 p-2 btn-primary mb-2"><router-link to="/dashboard" class="text-white">Dashboard</router-link></li>
            <li class="btn-pilihan active px-5 p-2 btn-warning mb-2"><router-link to="/tabledata" class="text-white">Table Data</router-link></li>
          </ul>
          <button type="button" class="btn btn-login btn-block btn-primary">
            <router-link to="/" class="text-white">LogOut</router-link>
          </button>
        </div>
      </div>

      <!-- Konten Kanan -->
      <div class="col-md-10">
        <div class="container shadow-lg pt-4 pb-4 background custom-border">
          <div class="d-flex">
            <div class="card shadow" style="width: 100%;">
              <div class="card-body">
                <div id="map" ref="map" style="height: 400px;"></div> 
              </div>
            </div>
            <div class="col-md-4">
              <div class="card shadow">
                <div class="card-body">
                  <form @submit.prevent="addMarker">
                    <div class="form-group">
                      <label for="latitude">Latitude:</label>
                      <input type="text" class="form-control" v-model="markerForm.latitude" required>
                    </div>
                    <div class="form-group">
                      <label for="longitude">Longitude:</label>
                      <input type="text" class="form-control" v-model="markerForm.longitude" required>
                    </div>
                    <div class="form-group">
                      <label for="Keterangan">Keterangan:</label>
                      <input type="text" class="form-control" v-model="markerForm.Keterangan" required>
                    </div>
                    <div class="form-group">
                      <label for="kategori">Kategori:</label>
                      <input type="text" class="form-control" v-model="markerForm.kategori" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Add Marker</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet';
import axios from 'axios';
import universityIcon from '@/assets/img/university.svg';
import hospitalIcon from '@/assets/img/hospital.svg';
import airportIcon from '@/assets/img/airport.svg';
import parkIcon from '@/assets/img/park.svg';
import puraIcon from '@/assets/img/hindu-temple.svg';

export default {
  name: 'DashboardUser',
  data() {
    return {
      markers: [],
      markerForm: {
        latitude: '',
        longitude: '',
        Keterangan: '',
        kategori: ''
      },
      map: null
    };
  },
  mounted() {
    // Inisialisasi peta Leaflet
    this.map = L.map('map').setView([-8.6832467, 115.2095182], 11);

    // Menambahkan layer peta OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    // Fetch data marker dari API
    const token = localStorage.getItem('token');
    axios.get('http://api_2105551050.local.net/api/markers', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      this.markers = response.data;
      response.data.forEach(marker => {
        var iconUrl = '';
        switch (marker.kategori) {
          case 'Universitas':
            iconUrl = universityIcon;
            break;
          case 'Rumah Sakit':
            iconUrl = hospitalIcon;
            break;
          case 'Bandara':
            iconUrl = airportIcon;
            break;
          case 'Pura':
            iconUrl = puraIcon;
            break;
          default:
            iconUrl = parkIcon;
        }

        var customIcon = L.icon({
          iconUrl: iconUrl, 
          iconSize: [20, 20]
        });

        L.marker([marker.latitude, marker.longitude], { icon: customIcon }).bindPopup(marker.Keterangan).addTo(this.map);
      });

      // Memperbarui ukuran peta setelah semua marker ditambahkan
      this.updateMapSize();
    })
    .catch(error => {
      console.error('Error fetching markers:', error);
    });
  },
  methods: {
    addMarker() {
      const token = localStorage.getItem('token');
      // Mengirim data marker ke API
      axios.post('http://api_2105551050.local.net/api/markers', this.markerForm, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .catch (error => {
        console.error('Upload data error:', error);
      });
      // .then(response => {
        console.log('Marker added successfully');
        // Mereset input form setelah marker ditambahkan
        this.markerForm.latitude = '';
        this.markerForm.longitude = '';
        this.markerForm.Keterangan = '';
        this.markerForm.kategori = '';
      // })
    },
    updateMapSize() {
      // Memperbarui ukuran peta
      if (this.map) {
        this.map.invalidateSize();
      }
    }
  }
};
</script>