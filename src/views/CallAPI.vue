<template>

    <header>
        <h1>Call API</h1>
    </header>

    <body>

        <div id="app">

            <v-btn @click="callAPI">Call API</v-btn>

            <p v-if="Object.keys(results).length>0"> {{ results }} </p>
            <p> {{ message }} </p>
            <p v-if="random_number!=0"> {{ random_number }} </p>
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
            results: {},
            message: 'Click the button to call the API.',
            random_number: 0,
            
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
                const results  = await response.json();
                this.results = results;
                this.message = results.message;
                this.random_number = results.random_number;

                console.warn('API called:', this.message);

            } catch (error) {
                console.error('Error calling API:', error);
            }
        },
    }
}
</script>