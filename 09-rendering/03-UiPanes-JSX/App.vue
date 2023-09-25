<template>
  <div class="sample container">
    <!-- Должны выводиться 4 панели без именованных слотов <template #pane-X> -->
    <UiPanes>
      <template #pane-0>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum harum id labore repellat sequi. Aliquam at
          consequuntur dolorem doloremque dolorum eum excepturi, incidunt laudantium, molestias quidem reprehenderit
          sunt suscipit ullam.
        </div>
      </template>
      <template #pane-1>
        <UiButton variant="primary">Pane 2 - Button</UiButton>
      </template>
      <template #pane-2>
        <UiInput placeholder="Pane 3 - Input" />
      </template>
      <template #pane-3>
        <div>
          <UiIcon icon="search" />
          <UiIcon icon="tv" />
          <UiIcon icon="coffee" />
          <UiIcon icon="key" />
        </div>
      </template>
    </UiPanes>
  </div>
</template>

<script>
import UiPanes from './components/UiPanes.vue';
import UiButton from './components/UiButton.vue';
import UiInput from './components/UiInput.vue';
import UiIcon from './components/UiIcon.vue';

export default {
  name: 'App',

  components: { UiIcon, UiInput, UiButton, UiPanes },
};
</script>

<style></style>
