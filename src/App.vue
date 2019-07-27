<template>
  <div id="app">
    <div class="flex">
      <button
        class="perjungimas"
        v-on:click="setActive('nauji')"
        :class="{ rodoma: isActive('nauji') }"
      >NAUJI PIRKINIAI</button>
      <button
        class="perjungimas"
        v-on:click="setActive('ankstesni')"
        :class="{ rodoma: isActive('ankstesni') }"
      >ANKSTESNI PIRKINIAI</button>
    </div>

    <DabartiniaiPirkiniai v-show="activeItem=='nauji'" :isActive="isActive" />
    <PaskutiniaiPirkiniai :isActive="isActive" :paskutiniaiPirkiniai="paskutiniaiPirkiniai" />
  </div>
</template>

<script>
import DabartiniaiPirkiniai from "./components/DabartiniaiPirkiniai.vue";
import PaskutiniaiPirkiniai from "./components/PaskutiniaiPirkiniai.vue";
import { db } from "./firebase";

export default {
  name: "app",
  data() {
    return {
      activeItem: "nauji"
    };
  },
  components: {
    DabartiniaiPirkiniai,
    PaskutiniaiPirkiniai
  },
  methods: {
    isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive(menuItem) {
      this.activeItem = menuItem;
    }
  },
  firebase: {
    paskutiniaiPirkiniai: db
      .ref("/pirkiniai")
      .orderByChild("nupirkta")
      .equalTo(true)
      .limitToLast(10)
  }
};
</script>

<style>
body {
  color: #363537;
  background-color: #d4ffad;
  font-family: Roboto;
}
h1 {
  text-align: center;
}

table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
}
th {
  text-align: left;
  background-color: #d4ffad;
}
tr {
  font-size: 1.5rem;
  border-bottom: 3px solid #363537;
}
tr:nth-child(odd) {
  background-color: #e2e093;
}
tr:nth-child(even) {
  background-color: #bfe293;
}

.btn {
  border: 1px solid #363537;
  border-radius: 5%;
  width: 10%;
  font-size: 1.5rem;
  background-color: #2fbf71;
  color: ghostwhite;
}

.forma {
  border: 1px solid#363537;
  border-radius: 5px;
  background-color: #ecffdb;
}

.form-input {
  border: none;
  width: 90%;
  font-size: 1.5rem;
  background-color: #ecffdb;
}
.ivedimo-data {
  width: 20%;
}
.nupirkta {
  width: 10%;
}
.nupirkta-btn {
  width: 2.5rem;
  height: 2.5rem;
}

.flex {
  display: flex;
}
.perjungimas {
  width: 50%;
  font-size: 1.5rem;
  font-family: Roboto;
  color: #e2e093;
  background-color: #363537;
  border: none;
  margin: 0;
  padding: 0;
  outline: 0;
  cursor: pointer;
  min-height: 4rem;
  text-align: center;
  align-items: center;
}

.rodoma {
  border: 1px solid #363537;
  color: #363537;
  background-color: ghostwhite;
}

.ripple {
  background-position: center;
  transition: background 0.8s;
}
.ripple:hover {
  background: #47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%)
    center/15000%;
}
.ripple:active {
  background-color: #6eb9f7;
  background-size: 100%;
  transition: background 0s;
}

.opacity {
  opacity: 0.2;
  visibility: hidden;
  transition: opacity 1.5s linear;
}

.matomi {
  visibility: visible;
  opacity: 1;
}

@media only screen and (min-width: 600px) {
  #app {
    padding: 0 5rem;
  }
  .btn {
    height: 2.5rem;
    width: 2.5rem;
    float: right;
  }
  .nupirkta {
    text-align: right;
  }
  .forma {
    height: 2.5rem;
  }
}
</style>
