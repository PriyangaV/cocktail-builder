<template>
    <div>
      <div class="nav">
        <router-link to="/"><font-awesome-icon icon="arrow-left" />Back Home</router-link>
      </div>
      <Builder/>
    </div>
</template>

<script>
    import Builder from "../components/Builder";
    export default {
        name: 'BuilderView',
        components: {
            Builder
        },
        data: function () {
            return {
                started: false,
            };
        }
    }
</script>
