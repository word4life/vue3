<template>
    <div>
      <h3>User Information</h3>
      <p><strong>IP Address:</strong> {{ ip }}</p>
      <p><strong>City:</strong> {{ city }}</p>
      <p><strong>Country:</strong> {{ country }}</p>
      
      <h3>Geolocation</h3>
      <p><strong>Latitude:</strong> {{ latitude }}</p>
      <p><strong>Longitude:</strong> {{ longitude }}</p>
      
      <h3>Device and Browser Info</h3>
      <p><strong>Device:</strong> {{ device }}</p>
      <p><strong>Browser:</strong> {{ browser }}</p>
      <p><strong>Operating System:</strong> {{ os }}</p>
      <p><strong>Language:</strong> {{ language }}</p>
    </div>
  </template>
  
  <script>
  // Correctly import ua-parser-js
  import { UAParser } from 'ua-parser-js';
  
  export default {
    data() {
      return {
        ip: null,
        city: null,
        country: null,
        latitude: null,
        longitude: null,
        device: null,
        browser: null,
        os: null,
        language: navigator.language || "Unknown",
      };
    },
    mounted() {
      // Get Geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.setLocation, this.error);
      }
  
      // Get IP Info
      this.getIPInfo();
  
      // Get Device, Browser, and OS info
      this.getDeviceInfo();
    },
    methods: {
      // Handle geolocation
      setLocation(position) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      },
      error() {
        console.log("Unable to retrieve your location.");
      },
  
      // Get IP info using ipinfo.io (free service)
      async getIPInfo() {
        try {
          const response = await fetch("https://ipinfo.io/json?token=c04c10ff41b71d");
          const data = await response.json();
          this.ip = data.ip;
          this.city = data.city;
          this.country = data.country;
        } catch (error) {
          console.error("Error fetching IP info:", error);
        }
      },
  
      // Get Device, Browser, and OS info using ua-parser-js
      getDeviceInfo() {
        const parser = new UAParser();
        const result = parser.getResult();
        this.device = result.device.model || "Unknown";
        this.browser = result.browser.name || "Unknown";
        this.os = result.os.name || "Unknown";
      }
    }
  };
  </script>
  
  <style scoped>
  h3 {
    margin-top: 20px;
  }
  p {
    margin: 5px 0;
  }
  </style>
  