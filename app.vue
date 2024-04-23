<script setup>
const { data } = await useFetch('/api/pipe');
console.log(data);
</script>

<template>
  <h1>List</h1>
  <List />
</template>
