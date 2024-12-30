<template>
    <v-card flat>
        <v-card-title class="d-flex align-center pe-2">
            <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
            History of Dog Pictures

            <v-spacer></v-spacer>

            <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
                variant="solo-filled" flat hide-details single-line></v-text-field>
        </v-card-title>

        <v-divider></v-divider>
        <v-data-table v-model:search="search" :filter-keys="['image', 'status']" :items="items">


            <template v-slot:item.image="{ item }">
                <v-card class="my-2" elevation="2" rounded>
                    <v-img :src="`${item.image}`" height="64" cover></v-img>
                </v-card>
            </template>

            <template v-slot:item.status="{ item }">
                <v-card class="my-2" elevation="2" rounded>
                    <v-chip :color="item.status === 'success' ? 'green' : 'red'"
                        :text="item.status === 'success' ? 'Success' : 'Failed'" class="text-uppercase" size="small"
                        label></v-chip>
                </v-card>
            </template>

        </v-data-table>
    </v-card>
</template>


<script>
import { supabase } from '../lib/supabase';

export default {
    data() {
        return {
            search: '',
            items: [
                {
                    id: null,
                    image: 'https://images.dog.ceo/breeds/sheepdog-shetland/n02105855_19944.jpg',
                    status: 'success',
                    created_at: '2021-09-01T12:00:00Z'
                }
            ],
        }
    },
    async mounted() {
        console.warn('Fetching history.');
        const { data, error } = await supabase.from('history').select('*');

        if (error) {
            console.error(error);
        } else {
            console.log(data);
            this.items = data;
        }
    },
}
</script>