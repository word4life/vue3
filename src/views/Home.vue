<template>
    
<header>
    <h1>Random Dog Picture Generator</h1>
</header>

<body>

    <div id="app">
        
        <v-btn @click="changePicture()">Change Picture</v-btn>
        <p>
            <img v-bind:src="imageUrl" :alt="title">
        </p>

        <v-list>
            <v-list-item  :class="picture.isFav" @click="toggleFav(picture)">
                {{picture.message}}
                {{picture.status}}
            </v-list-item>
        </v-list>
        <!--<p>{{title}} - {{author}} - {{age}}</p>
        
        <button @click="increment">Increment Age</button>
        <button @click="decrement">Decrement Age</button>
    -->

    </div>

    
</body>

<footer>
    <!--<p>Footer</p>-->
</footer>
</template>

<script>


export default  {
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
        this.fetchPicture(); // Call the method when the component is mounted
    },

};

</script>


<style>
    img {
        border-radius: 50%;
        width: 200px;
        height: 200px;
    }

    li {
        list-style-type: none;
        color: red;

    }
    li.fav {
        list-style-type: circle;
        color: green;

    }
    
</style>