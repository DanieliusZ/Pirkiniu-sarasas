<template>
  <div id="app">
    <div>
      <div class="form-group">
        <label for="pirkinys">Pirkinys</label>
        <input type="text" class="form-control" id="pirkinys" v-model="naujasPirkinys" placeholder="Rašykite čia">
      </div>
      <button type="submit" class="btn btn-primary" @click="itrauktiPirkini">Įtraukti</button>
    </div>
    <table class="table" >
      <thead>
        <tr>
          <th scope="col">Įvedimo data</th>
          <th scope="col">Pirkinys</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in nenupirktuSarasas" :key="key">
          <td>{{item.data}}</td>
          <td>{{item.pirkinys}}</td>
          <td><button type="submit" class="btn btn-primary" @click="nupirktas(item.key)">Žymęti kaip nupirktą</button></td>
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

  asyncComputed: {
    nenupirktuSarasas() {
      return new Promise((resolve, reject) => {
        db.database()
          .ref("pirkiniai")
          .on("value", data => {
            let final = [];
            data.forEach(item => {
              let itemKey = item.key;
              let itemData = item.val();
              itemData["key"] = itemKey;
              final.push(itemData);
              // let converted = Object.keys(data.val()).map(key => {
              //   return data.val()[key];
              // });
            });
            resolve(final);
          });
      });
    }
  },
  // computed: {
  //   naenupirktuSarasas() {
  //     let converted = Object.keys(this.nenupirktuSarasas).map(key => {
  //       return this.nenupirktuSarasas[key];
  //     });
  //     return converted;
  //   }
  // },
  methods: {
    itrauktiPirkini() {
      // console.log(this.naujasPirkinys);
      // console.log(this.nenupirktuSarasas);
      db.database()
        .ref("pirkiniai")
        .push({
          data: new Date().toISOString(),
          pirkinys: this.naujasPirkinys,
          nupirkta: false
        });
      this.naujasPirkinys = "";
    },
    nupirktas(key) {
      // console.log(this.nenupirktuSarasas);
      // console.log(this.naenupirktuSarasas);
      // console.log(key);
      db.database()
        .ref("pirkiniai/" + key)
        .update({ nupirkta: true });
    }
  }
  // created() {
  //   db.database()
  //     .ref("first")
  //     .on("value", data => {
  //       console.log(data.val());
  //       this.pirkiniuSarasas = data.val();
  //     });
  // }
  //.split('T')[0] filtrui
};
</script>
