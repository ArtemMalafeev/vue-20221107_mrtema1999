<template>
  <div class="sample container">
    <select v-model="activeTab">
      <option value="tab1">tab1</option>
      <option value="tab2">tab2</option>
      <option value="tab3">tab3</option>
    </select>

    <UiTabs v-model:active="activeTab">
      <UiTab name="tab1" title="Tab 1">
        <h3>Title of Tab 1</h3>
        <p>Content Of Tab 1</p>
      </UiTab>

      <UiTab name="tab2" title="Tab 2">
        <h3>Title of Tab 2</h3>
        <p>Content Of Tab 2</p>
      </UiTab>

      <UiTab name="tab3" title="Tab 3">
        <h3>Title of Tab 3</h3>
        <p>Content Of Tab 3</p>
      </UiTab>
    </UiTabs>
  </div>
</template>

<script>
import UiTabs from './components/UiTabs.vue';
import UiTab from './components/UiTab.vue';

export default {
  name: 'App',

  components: { UiTab, UiTabs },

  data() {
    return {
      activeTab: 'tab1',
    };
  },
};
</script>

<style></style>
