<template>
  <div id="app">
    <h1>Pirkinių sąrašas</h1>
    <div class="forma">
      <input type="text" class="form-input" v-model="naujasPirkinys" placeholder="Įtraukite pirkinį">
      <p class="to-right"><button type="submit" class="btn ripple" @click="itrauktiPirkini"><i class="fas fa-plus"></i></button></p>    
    </div>
    <table class="table" >
      <thead>
        <tr class="iprastas-fonas">
          <th>Data</th>
          <th>Pirkinys</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in pirkiniai" :key="key">
          <td class="ivedimo-data">{{item.data | data}}</td>
          <td>{{item.pirkinys}}</td>
          <td class="nupirkta"><button type="submit" class="btn nupirkta-btn ripple" @click="nupirktas(item['.key'])"><i class="fas fa-check"></i></button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { db } from "./firebase";

export default {
  name: "app",
  data() {
    return {
      naujasPirkinys: "",
      pirkiniuSarasas: ""
    };
  },

  firebase: {
    pirkiniai: {
      source: db
        .ref("/pirkiniai")
        .orderByChild("nupirkta")
        .equalTo(false),
      asObject: false,
      cancelCallback(err) {
        console.error(err);
      }
    }
  },

  methods: {
    itrauktiPirkini() {
      db.ref("pirkiniai").push({
        data: new Date().toISOString(),
        pirkinys: this.naujasPirkinys,
        nupirkta: false
      });
      this.naujasPirkinys = "";
    },
    nupirktas(key) {
      db.ref("pirkiniai/" + key).update({ nupirkta: true });
    }
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
  border-radius: 50%;
  width: 10%;
  font-size: 1.5rem;
  background-color: #2fbf71;
  color: ghostwhite;
}

.forma {
  border: 1px solid#363537;
  border-right: none;
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
.to-right {
  margin: 0;
  padding: 0;
  display: inline;
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

@media only screen and (min-width: 600px) {
  #app {
    padding: 0 5rem;
  }
  .btn {
    height: 2.5rem;
    width: 2.5rem;
  }
  .nupirkta {
    text-align: right;
  }
  .to-right {
    text-align: right;
  }
  .to-right {
    width: 10%;
    margin: 0;
    padding: 0;
    display: inline-block;
  }
}
</style>
