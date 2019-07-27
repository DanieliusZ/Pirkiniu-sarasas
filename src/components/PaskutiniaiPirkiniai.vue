<template>
  <div class="opacity" :class="{ matomi: isActive('ankstesni')}">
    <table class="table">
      <thead>
        <tr class="iprastas-fonas">
          <th>Pirkinys</th>
          <th>Nupirktas</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in paskutiniaiPirkiniai" :key="key">
          <td>{{item.pirkinys}}</td>
          <td class="ivedimo-data">{{item.nupirkimoData | data}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
 
<script>
export default {
  name: "PaskutiniaiPirkiniai",
  props: { isActive: Function, paskutiniaiPirkiniai: Object }
};
</script>