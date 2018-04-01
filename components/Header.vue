<template>
  <header>
    <b-navbar toggleable="md" variant="light">
      <b-container>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand :to="{ name: 'index' }">AlgoRepo</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item :to="{ name: 'index' }">Home</b-nav-item>
            <b-nav-item :to="{ name: 'calculators' }">Calculators</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown v-if="user" right>
              <template slot="button-content">
                <em>Hello, {{ user.name || user.username }}</em>
              </template>
              <b-dropdown-item :to="{ name: 'calculators', params: { mine: 'mine' } }">My Calculators</b-dropdown-item>
              <b-dropdown-item disabled :to="{ name: 'whoknows' }">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item v-else>Login</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </header>
</template>

<script>
export default {
  props: {
    user: Object
  }
};
</script>
