

<template>
  <div class="hello">
    under construction
    <ul v-if="items.length > 0">
      <li v-for="item in items" :key="item.id">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },

  data() {
    return {
      items: [
        { title: '', id: null },
      ]
    }
  },
  mounted() {

    const url = process.env.NODE_ENV === 'development'
        ? 'http://localhost:8080'
        : 'https://northbois-backend.herokuapp.com'

    axios({
      method: 'get',
      url: url + `/data`,
    })
        .then((response) =>  {
          console.log(response)
          this.items = response.data.yo
        });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
