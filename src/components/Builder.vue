<template>
    <div class="builder">
        <Loader v-if="status === 'loading'"/>
        <div class="cocktail" v-if="drink && status !== 'loading'">
            <div class="cocktail__details">
                <figure class="cocktail__image" :style="{ backgroundImage: `url(${drink.strDrinkThumb})` }"/>
                <h1><span>Popular</span>{{drink.strDrink}}</h1>
                <div class="cocktail__overview">
                    <p>{{drink.strCategory}}, {{drink.strGlass}} Glass, {{drink.strAlcoholic}}</p>
                </div>
            </div>
            <div class="cocktail__method">
                <h1>How to Make it</h1>
                <ul class="cocktail__method__ingredients">
                    <li v-for="ingredient in drinkIngredients" :key="ingredient.id">
                        <p><strong>{{ingredient.measurement}}</strong> {{ingredient.ingredient}}</p>
                    </li>
                </ul>
                <br>
                <p class="cocktail__method__instructions">
                    {{drink.strInstructions}}
                </p>
                <br>
                <button class="button button--primary" v-on:click="build()">Build another one</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Loader from "./Loader";
    import axios from "axios";
    import _ from "lodash"; // eslint-disable-line

    export default {
        name: 'Generator',
        components: {Loader},
        data: function () {
            return {
                showGenerateBtn: true,
                status: null,
                drink: null,
                drinkIngredients: [],
            };
        },

        created() {
            console.log('i am created');
            this.build();
        },
        methods: {
            sleeper(ms) {
                return function (x) {
                    return new Promise(resolve => setTimeout(() => resolve(x), ms));
                };
            },

            build() {
                this.showGenerateBtn = false;
                this.status = 'loading';
                // Cocktails provided by https://www.thecocktaildb.com
                axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php').then(function (response) {
                    setTimeout(function () {
                        this.drink = response.data.drinks[0];
                        console.log(this.drink);

                        [...Array(15)].map((_, i) => {
                            let ingredient = this.drink['strIngredient' + i];
                            let measurement = this.drink['strMeasure' + i];

                            if (ingredient) {
                                this.drinkIngredients.push({
                                    'id': i,
                                    'ingredient': ingredient,
                                    'measurement': measurement
                                });
                            }
                        });

                        console.log(this.drinkIngredients);
                        this.status = 'overview';
                    }.bind(this), 2000);
                }.bind(this));
            }
        }
    }
</script>
