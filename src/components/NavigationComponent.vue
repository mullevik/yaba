<template>
    <nav>
        <router-link to="/">
            <font-awesome-icon icon="fa-solid fa-table-list" />
        </router-link>
        <router-link to="/month">
            <font-awesome-icon icon="fa-solid fa-chart-bar" />
        </router-link>
        <router-link to="/overview">
            <font-awesome-icon icon="fa-solid fa-chart-line" />
        </router-link>
        <router-link to="/settings">
            <font-awesome-icon icon="fa-solid fa-gear" />
        </router-link>
    </nav>
</template>

<script>
export default {
    name: 'NavigationComponent',
}

</script>

<style scoped>
nav {
    position: fixed;
    bottom: 0;
    background-color: green;
    display: grid;
    grid-template-areas: "nav-item nav-item nav-item nav-item";
    width: 100%;
}

nav a {
    display: block;
    padding: 0.5em;
    font-size: 1.5em;
    background-color: black;
}
</style>