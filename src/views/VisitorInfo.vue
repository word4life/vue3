<template>
    <div>
        <h3>User Information</h3>
        <p><strong>IP Address:</strong> {{ page_visit_data.ip_address }}</p>
        <p><strong>City:</strong> {{ page_visit_data.city }}</p>
        <p><strong>Country:</strong> {{ page_visit_data.country }}</p>

        <h3>Geolocation</h3>
        <p><strong>Latitude:</strong> {{ page_visit_data.latitude }}</p>
        <p><strong>Longitude:</strong> {{ page_visit_data.longitude }}</p>

        <h3>Device and Browser Info</h3>
        <p><strong>Device:</strong> {{ page_visit_data.device_model }}</p>
        <p><strong>Browser:</strong> {{ page_visit_data.browser_name }}</p>
        <p><strong>Operating System:</strong> {{ page_visit_data.os_name }}</p>
        <p><strong>Language:</strong> {{ page_visit_data.language }}</p>

        <p>Page URL: {{ page_visit_data.page_url }}</p>
        <p>Referrer URL: {{ page_visit_data.referrer_url }}</p>
        <p>User Agent: {{ page_visit_data.user_agent }}</p>
        <!-- <v-btn @click="displayPageVisit">Log Page Visit</v-btn> -->
    </div>
</template>

<script>

import logPageVisit from '@/composables/page_visit';
import { ref } from 'vue';

// import { warn } from 'vue';

export default {
    data() {
        return { page_visit_data: logPageVisit() };
    },
    // mounted() {
    //     // log page visit
    //     console.log('VisitorInfo mounted');
    //     logPageVisit();
    // },
    

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