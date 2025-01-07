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

        <p>Page URL: {{ pageUrl }}</p>
        <p>Referrer URL: {{ referrerUrl }}</p>
        <p>User Agent: {{ userAgent }}</p>

    </div>
</template>

<script>
// Correctly import ua-parser-js
import { UAParser } from 'ua-parser-js';
import { supabase } from '../lib/supabase';
import { warn } from 'vue';

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
            page_url: null,
            referrer_url: null,
            user_agent: null
        };
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
                console.log(data);
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
            this.pageUrl = window.location.href; // Get current page URL
            this.referrerUrl = document.referrer || null; // Get referrer URL
            this.userAgent = navigator.userAgent; // Get user-agent string
        },

        async savePageVisit() {
            const { data, error } = await supabase
                .from('page_visits')
                .insert([
                    {
                        ip_address: this.ip,
                        city: this.city,
                        country: this.country,
                        latitude: this.latitude,
                        longitude: this.longitude,
                        device: this.device,
                        browser: this.browser,
                        os: this.os,
                        language: this.language,
                        page_url: this.pageUrl,
                        referrer_url: this.referrerUrl,
                        user_agent: this.userAgent
                    },
                ])
                .select()

            if (error) {
                console.error('Error inserting page visit:', error.message);
            } else {
                console.log('Page visit logged:', data);
            }
        }
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
        // setTimeout(() => {
        //     this.savePageVisit();
        // }, 1000);
    },
    watch: {
        ip: function (newVal, oldVal) {
            console.log('IP changed:', newVal, oldVal);
            this.savePageVisit();
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