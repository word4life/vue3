// src/composables/usePageVisit.js
import { ref, onMounted, watch } from 'vue';
import { UAParser } from 'ua-parser-js';
import { supabase } from '../lib/supabase';

export default function logPageVisit() {
    console.log('Page visit composables initialized');
    const ip_address = ref(null);
    const city = ref(null);
    const country = ref(null);
    const latitude = ref(null);
    const longitude = ref(null);
    const device_model = ref(null);
    const browser_name = ref(null);
    const os_name = ref(null);
    const language = ref(navigator.language || 'Unknown');
    const page_url = ref(window.location.href);
    const referrer_url = ref(document.referrer || null);
    const user_agent = ref(navigator.userAgent);

    // Fetch IP info
    const getIPInfo = async () => {
        try {
            const response = await fetch('https://ipinfo.io/json?token=c04c10ff41b71d');
            const data = await response.json();
            ip_address.value = data.ip;
            city.value = data.city;
            country.value = data.country;
        } catch (error) {
            console.error('Error fetching IP info:', error);
        }
    };

    // Fetch device info
    const getDeviceInfo = () => {
        const parser = new UAParser();
        const result = parser.getResult();
        device_model.value = result.device.model || 'Unknown';
        browser_name.value = result.browser.name || 'Unknown';
        os_name.value = result.os.name || 'Unknown';
    };

    // Handle geolocation
    const setLocation = (position) => {
        latitude.value = position.coords.latitude;
        longitude.value = position.coords.longitude;
    };

    const logError = () => {
        console.log('Unable to retrieve your location.');
    };

    // Save page visit to Supabase
    const savePageVisit = async () => {
        console.log('Saving page visit...');
        try {
            const { data, error } = await supabase
                .from('page_visits')
                .insert([
                    {
                        ip_address: ip_address.value,
                        city: city.value,
                        country: country.value,
                        latitude: latitude.value,
                        longitude: longitude.value,
                        device_model: device_model.value,
                        browser_name: browser_name.value,
                        os_name: os_name.value,
                        language: language.value,
                        page_url: page_url.value,
                        referrer_url: referrer_url.value,
                        user_agent: user_agent.value,
                    },
                ]);
            return data;

            if (error) throw error;

            console.log('Page visit logged:', data);
        } catch (err) {
            console.error('Error saving page visit:', err.message);
        }
    };

    // Initialize on mount
    onMounted(() => {
        console.log('Page visit initialized');
        
        // Get IP and device info
        getIPInfo();
        getDeviceInfo();
        
        // Get geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setLocation, logError);
        }
        console.log('Page visit completed');
    });

    // Save page visit when IP address changes
    watch(ip_address, (new_ip) => {
        console.log('New IP address:', new_ip);
        if (new_ip) {
            savePageVisit();
        }
    });

    return {
        ip_address,
        city,
        country,
        latitude,
        longitude,
        device_model,
        browser_name,
        os_name,
        language,
        page_url,
        referrer_url,
        user_agent,
    };
}
