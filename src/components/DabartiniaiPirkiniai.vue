<template>
  <div>
    <div class="forma">
      <input
        type="text"
        class="form-input"
        v-model="naujasPirkinys"
        placeholder="Įtraukite pirkinį"
      />
      <button type="submit" class="btn ripple" @click="itrauktiPirkini">
        <i class="fas fa-plus"></i>
      </button>
    </div>
    <table class="table">
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
          <td class="nupirkta">
            <button type="submit" class="btn nupirkta-btn ripple" @click="nupirktas(item['.key'])">
              <i class="fas fa-check"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { db } from "../firebase";

export default {
  name: "dabartiniaiPirkiniai",
  data() {
    return {
      naujasPirkinys: "",
      pirkiniai: []
    };
  },
  props: ["isActive"],
  firebase: {
    pirkiniai: db
      .ref("/pirkiniai")
      .orderByChild("nupirkta")
      .equalTo(false)
  },

  methods: {
    nupirktas(key) {
      db.ref("pirkiniai/" + key).update({
        nupirkta: true,
        nupirkimoData: new Date().toISOString()
      });
    },

    itrauktiPirkini() {
      db.ref("pirkiniai").push({
        data: new Date().toISOString(),
        pirkinys: this.naujasPirkinys,
        nupirkta: false
      });
      this.naujasPirkinys = "";
    }
  }
};
</script>
