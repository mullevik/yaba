<template>
    <nav>
        <router-link :to="{name: 'home'}">
            <font-awesome-icon icon="fa-solid fa-table-list" />
        </router-link>
        <router-link :to="{name: 'monthly'}">
            <font-awesome-icon icon="fa-solid fa-chart-bar" />
        </router-link>
        <a>
            <font-awesome-icon icon="fa-solid fa-chart-line" />
        </a>
        <router-link :to="{name: 'settings'}">
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
    background-color: var(--cp-secondary-light);
    display: grid;
    grid-template-areas: "nav-item nav-item nav-item nav-item";
    width: 100%;
}

nav a {
    display: block;
    padding: 0.5em;
    font-size: 1.5em;
    color: var(--cp-text-light-dimmed);
}

nav a:hover,
 nav a.router-link-active,
 nav a.router-link-exact-active {
    color: var(--cp-primary);
 }
</style>