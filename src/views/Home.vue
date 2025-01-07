<template>

    <header>
        <h1>Random Dog Picture Generator</h1>
    </header>

    <body>

        <div id="app">
            <v-card class="mx-auto" max-width="344">
                <v-img v-bind:src="imageUrl" :alt="title"></v-img>

                <v-card-title>
                    Dog Picture
                </v-card-title>

                <v-card-subtitle>
                    This a random dog picture.
                </v-card-subtitle>

                <v-card-actions>
                    <v-btn color="orange" elevation="16" @click="changePicture()">Change Picture</v-btn>
                </v-card-actions>
            </v-card>


        </div>

    </body>

    <footer>
        <!--<p>Footer</p>-->
    </footer>
</template>

<script>

import { supabase } from '../lib/supabase';

export default {
    data() {
        return {
            title: 'Image',
            author: 'Jane Doe',
            age: 25,
            picture: {},
            imageUrl: '',
            isFav: 'fav',
            param: null
        }
    },
    methods: {
        async fetchPicture() {
            console.warn('Fetching picture.');
            try {
                const response = await fetch('https://dog.ceo/api/breeds/image/random');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                this.picture = await response.json();
                this.imageUrl = this.picture.message;

                const { data, error } = await supabase
                    .from('history')
                    .insert([
                        { image: this.picture.message, status: this.picture.status },
                    ])
                    .select()

                console.warn('Picture fetched:', this.picture);

            } catch (error) {
                console.error('Error fetching picture:', error);
            }
        },
        increment() {
            this.age++
            console.warn('increment.');
        },
        decrement() {
            this.age--
            console.warn('decrement.');
        },
        changePicture() {
            console.warn('Change title.');
            this.fetchPicture(); // Call the method when the title is changed
            this.title = this.imageUrl;
        },
        imageURL() {
            console.warn('return image url.');
            return this.imageUrl
        },
        toggleFav(pic) {
            if (pic.isFav === 'fav') {
                pic.isFav = 'notFav';
            }
            else {
                pic.isFav = 'fav';
            }
            console.warn(pic.isFav);
        }
    },
    mounted() {
        console.warn('Component mounted.');
        // this.fetchPicture(); // Call the method when the component is mounted
        this.$router.push({ name: 'Provider Search' });
    },

};

</script>


<style></style>