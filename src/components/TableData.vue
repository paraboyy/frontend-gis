<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2  shadow-lg pt-3 pb-3 custom-border">
            <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                <ul class="nav nav-pills" style="display: block;">
                    <li class="btn-display active px-5 p-2 btn-warning mb-2"><center><router-link to="/dashboard" class="text-white">Dashboard</router-link></center></li>
                    <li class="btn-pilihan active px-5 p-2 btn-primary mb-2"><center><router-link to="/tabledata" class="text-white">Table Data</router-link></center></li>
                </ul>
                <button type="button" class="btn btn-login btn-block btn-primary">
                    <router-link to="/" class="text-white">LogOut</router-link>
                </button>
            </div>
        </div>


        <div class="col-md">
          <!-- <div>token{{ token }}</div> -->
            <div class="container shadow-lg pt-4 pb-4 custom-border">
              <div class="table-bordered">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col" @click="toggleSort('keterangan')">Nama Tempat</th>
                      <th scope="col" @click="toggleSort('kategori')">Kategori</th>
                      <th scope="col" @click="toggleSort('latitude')">Latitude</th>
                      <th scope="col" @click="toggleSort('latitude')">Longitude</th>
                      <th scope="col">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in paginatedData" :key="index">
                      <td>{{ item.Keterangan }}</td>
                      <td>{{ item.kategori }}</td>
                      <td>{{ item.latitude }}</td>
                      <td>{{ item.latitude }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="d-flex justify-content-center mt-3">
                <button class="btn background mr-2 custom-border" @click="previousPage" :disabled="currentPage === 0">Halaman Sebelumnya</button>
                <button class="btn background custom-border" @click="nextPage" :disabled="currentPage === lastPage">Halaman Berikutnya</button>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>
  
  <script>
  import axios from 'redaxios';
  
  export default {
    data() {
      return {
        data: [], // data dari API akan disimpan di sini
        currentPage: 0, // Halaman saat ini untuk daftar order pelanggan
        currentPageCustomers: 0, // Halaman saat ini untuk data lokasi pelanggan
        pageSize: 10, // Jumlah data per halaman
        token: '', //Token dari API
        sortColumn: '', // Kolom yang sedang diurutkan
        sortDirection: 'asc' // Arah pengurutan (ascending atau descending)
      };
    },
    computed: {
      lastPage() {
        return Math.ceil(this.data.length / this.pageSize) - 1;
      },
      lastPageCustomers() {
        return Math.ceil(this.paginatedCustomers.length / this.pageSize) - 1;
      },
      paginatedData() {
        const startIndex = this.currentPage * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        let sortedData = this.data.slice().sort(this.sortByColumn);
        if (this.sortDirection === 'desc') {
          sortedData.reverse();
        }
        return sortedData.slice(startIndex, endIndex);
      },
      uniqueCustomers() {
        const uniqueCustomers = [];
        const customerNames = new Set();
        this.data.forEach(item => {
          if (!customerNames.has(item.Customer_Name)) {
            customerNames.add(item.Customer_Name);
            uniqueCustomers.push(item);
          }
        });
        return uniqueCustomers;
      },
      paginatedCustomers() {
        const startIndex = this.currentPageCustomers * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.uniqueCustomers.slice(startIndex, endIndex);
      }
    },
    methods: {
      async fetchData() { //metod untuk mengambil data dari API
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://api_2105551050.local.net/api/markers', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
  
          // Pastikan respons adalah sebuah array sebelum menetapkannya ke properti data
          if (Array.isArray(response.data)) {
            this.data = response.data;
          } else {
            console.error('Hasil respon bukan array: ', response.data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
      previousPage() {
        if (this.currentPage > 0) {
          this.currentPage--;
        }
      },
      nextPage() {
        if (this.currentPage < this.lastPage) {
          this.currentPage++;
        }
      },
      previousPageCustomers() {
        if (this.currentPageCustomers > 0) {
          this.currentPageCustomers--;
        }
      },
      nextPageCustomers() {
        if (this.currentPageCustomers < this.lastPageCustomers) {
          this.currentPageCustomers++;
        }
      },
      sortByColumn(a, b) {
        if (this.sortDirection === 'asc') {
          if (a[this.sortColumn] < b[this.sortColumn]) return -1;
          if (a[this.sortColumn] > b[this.sortColumn]) return 1;
          return 0;
        } else {
          if (a[this.sortColumn] < b[this.sortColumn]) return 1;
          if (a[this.sortColumn] > b[this.sortColumn]) return -1;
          return 0;
        }
      },
      toggleSort(column) {
        if (this.sortColumn === column) {
          this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          this.sortColumn = column;
          this.sortDirection = 'asc';
        }
      }
    },
    created() {
      this.fetchData();
    }
  };
  </script>
  