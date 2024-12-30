<template>

    <header>
        <h1>Call API</h1>
    </header>

    <body>

        <div id="app">

            <v-btn @click="callAPI">Call API</v-btn>

            <p> {{ message }} </p>
        </div>


    </body>

    <footer>
        <!--<p>Footer</p>-->
    </footer>
</template>

<script>
export default {
    data() {
        return {
            message: 'Call API'
        }
    },
    methods: {
        async callAPI() {
            console.warn('Calling API.');
            try {
                const response = await fetch('http://localhost:3001/api');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                this.message = await response.text();

                console.warn('API called:', this.message);

            } catch (error) {
                console.error('Error calling API:', error);
            }
        },
    }
}
</script>