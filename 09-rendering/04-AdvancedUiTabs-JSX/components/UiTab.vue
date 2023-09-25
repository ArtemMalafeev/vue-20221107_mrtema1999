<template>
  <slot />
</template>

<script>
// Этот компонент используется только для передачи данных и содержимого в UiTabs

export default {
  name: 'UiTab',

  props: {
    name: String,
    title: String,
  },
};
</script>
